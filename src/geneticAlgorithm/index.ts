/* eslint-disable no-unused-vars */
import {ReduxNodeObject} from '../interface/redux/extensions/ReduxNodeObject';
import {ReduxLinkObject} from '../interface/redux/extensions/ReduxLinkObject';
import {NodeEntity} from './domain/graph/NodeEntity';
import {LinkEntity} from './domain/graph/LinkEntity';
import {Graph} from './domain/graph/Graph';
import {Chromosome} from './domain/Chromosome';
import {Population} from './domain/Population';
import {addAction} from '../interface/redux/slicers/actionsSlice';
import store from '../interface/redux/store';
import {
    addStepInfo,
    clearStepsInfo,
    setExecutionTime,
    setPath,
    setResultFunction
} from '../interface/redux/slicers/graphSlice';
import {ActionType} from "../interface/redux/extensions/enums/ActionType";
import {Config} from "../interface/components/GenAlgWindow/AlgorithmConfigPanel";
import {canonical, chcAlgorithm, genitor} from "./models";
import {AlgorithmType} from "../interface/redux/extensions/enums/AlgorithmType";

function getState<T>(source: T, type: "initial" | "infinite"): T {
    const castedSource = {...source} as any
    Object.keys(castedSource).forEach((key) => {
        if (typeof castedSource[key] === 'number') {
            switch (type) {
                case "initial": {
                    castedSource[key] = 0
                    break
                }
                case "infinite": {
                    castedSource[key] = Number.MAX_VALUE
                    break
                }
                default: {
                    throw new Error("Unknown state name")
                }
            }
        }
    })

    return castedSource as T
}

function initializeGraph(nodesList: Array<ReduxNodeObject>, linksList: Array<ReduxLinkObject>) {
    const nodes = nodesList.map((el) =>
        new NodeEntity(el.label, el.id),
    );
    const links = linksList.map((el) =>
        new LinkEntity(el.source, el.target, el.value, el.id),
    );

    return new Graph(nodes, links);
}

function fitnessFunction<T>(
    entity: Chromosome<number>,
    onSum: (first: T, second: T) => void,
    states: { initial: T, infinite: T },
    graph: Graph<T>,
    limits: Array<{ name: string, limit: number }>
): number {
    const totalParamSum = graph.getTotalDistance(
        entity.gens, onSum, {initial: {...states.initial}, infinite: {...states.infinite}}
    ) as any
    const keys = Object.keys(totalParamSum)

    for (let i = 0; i < keys.length; i++) {
        const constraint = limits.find((limit) => limit.name === keys[i])
        if (constraint && totalParamSum[constraint.name] > constraint.limit) {
            return Number.MAX_VALUE
        }
    }

    return 1 / totalParamSum[keys[0]]
}

function appendAction(title: string, type: ActionType = ActionType.DEFAULT) {
    store.dispatch(
        addAction([{title, type}],)
    );
}

async function createNewPopulation<T>(
    graph: Graph<T>,
    startNodeId: number,
    populationSize: number
) {
    const paths: Array<Chromosome<number>> = []

    for (let i = 0; i < populationSize; i++) {
        let path: Array<number> | undefined
        try {
            path = await graph.createRandomPath(startNodeId)
            paths.push(new Chromosome(...path))
        } catch (e: any) {
            // just ignore it
        }
    }

    if (paths.length === 0) {
        const message = "End is unreachable (it is impossible to bypass all the " +
            "vertices once and return to the given one)"
        appendAction(message, ActionType.ERROR)

        throw new Error(message)
    }

    return new Population(...paths);
}

/**
 * Runs a pre-configured genetic algorithm to solve the
 * traveling salesman problem
 * @param config
 * @param {Array<ReduxNodeObject>} nodesList list of available
 * vertices in the graph
 * @param {Array<ReduxLinkObject>} linksList list of available
 * links in the column
 * @param limits
 * @param {NodeEntity|undefined} startNode
 * @param algorithm
 */
export async function startAlgorithm(
    config: Config,
    nodesList: Array<ReduxNodeObject>,
    linksList: Array<ReduxLinkObject>,
    limits: Array<{ name: string, limit: number }>,
    algorithm: AlgorithmType = AlgorithmType.CANONICAL,
    startNode?: NodeEntity
) {
    console.log(limits)
    store.dispatch(clearStepsInfo())
    appendAction('Запускаем алгоритм')

    appendAction('Инициализируем функции')
    const initialState = getState(linksList[0].value, "initial")
    const infiniteState = getState(linksList[0].value, "infinite")
    // const finishCondition = (population: Population<number>) =>
    //     population.entities
    //         .map((el) => calculateFitnessFor(el))
    //         .every((obj, _, array) =>
    //             obj === array[0] && array[0] !== 1 / Number.MAX_VALUE,
    //         );

    const onSum = <T, >(first: T, second: T) => {
        const [firstAsObj, secondAsObj] = [first as any, second as any]
        Object.keys(firstAsObj).forEach((key) => {
            if (typeof firstAsObj[key] === 'number') {
                firstAsObj[key] += secondAsObj[key]
            }
        })
    }
    const calculateFitnessFor = (chromosome: Chromosome<number>) =>
        fitnessFunction(
            chromosome,
            onSum,
            {initial: {...initialState}, infinite: {...infiniteState}},
            graph,
            limits
        )
    const calculateDistanceFor = (chromosome: Chromosome<number>) =>
        graph.getTotalDistance(
            chromosome.gens,
            onSum,
            {initial: {...initialState}, infinite: {...infiniteState}}
        )

    appendAction('Конвертируем элементы графа');
    const graph = initializeGraph(nodesList, linksList);
    const startNodeId = startNode ? startNode.id : graph.nodes[0].id

    appendAction('Создаём начальную популяцию')
    const initialPopulation = await createNewPopulation(graph, startNodeId, config.populationSize);

    const chooseAlgorithm = async (type: AlgorithmType) => {
        // @ts-ignore
        switch (AlgorithmType[type]) {
            case AlgorithmType.CANONICAL:
                console.log('Канонический')
                return canonical(
                    config.mutationRate,
                    config.crossoverRate,
                    initialPopulation,
                    calculateFitnessFor,
                    config.generationsCount
                )
            case AlgorithmType.GENITOR:
                console.log('Генитор')
                return genitor(
                    config.mutationRate,
                    initialPopulation,
                    calculateFitnessFor,
                    config.generationsCount,
                    graph,
                    startNodeId
                )
            case AlgorithmType.CHC:
                console.log('CHC')
                return chcAlgorithm(
                    config.mutationRate,
                    config.crossoverRate,
                    initialPopulation,
                    calculateFitnessFor,
                    config.generationsCount
                )
        }
    }

    const startTime = performance.now()
    await chooseAlgorithm(algorithm).then((res) => {
        if (!res) {
            appendAction('Не удалось получить результат', ActionType.ERROR)
            return
        }

        console.log(
            calculateFitnessFor(res.result.entities[0])
        )
        const firstSuitable = res.result.entities
            .sort((a, b) =>
                calculateFitnessFor(b) - calculateFitnessFor(a)
            )
            .find((el) =>
                calculateFitnessFor(el) !== Number.MAX_VALUE
            )
        if (!firstSuitable) {
            store.dispatch(setPath(undefined))
            appendAction("Подходящий путь не найден!", ActionType.ERROR)
            return
        }


        appendAction('Алгоритм успешно завершил работу')
        store.dispatch(
            setPath({
                nodes: firstSuitable.gens,
                totalLength: calculateDistanceFor(firstSuitable)
            })
        );
        res.progress.forEach((pop) => {
            store.dispatch(addStepInfo(pop))
        })
        store.dispatch(addStepInfo(res.result))
        store.dispatch(
            setResultFunction(
                (population) => {
                    return calculateDistanceFor(
                        population.entities
                            .sort((a: Chromosome<number>, b: Chromosome<number>) =>
                                calculateFitnessFor(b) - calculateFitnessFor(a)
                            )[0]
                    ).distance
                }
            )
        )
        store.dispatch(setExecutionTime(performance.now() - startTime))
    }).catch((err) => {
        appendAction('Произошла ошибка во время работы алгоритма', ActionType.ERROR)
        console.error(err);
    });
}
