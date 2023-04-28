/* eslint-disable no-unused-vars */
import {ReduxNodeObject} from '../interface/redux/extensions/ReduxNodeObject';
import {ReduxLinkObject} from '../interface/redux/extensions/ReduxLinkObject';
import {NodeEntity} from './domain/graph/NodeEntity';
import {LinkEntity} from './domain/graph/LinkEntity';
import {Graph} from './domain/graph/Graph';
import {geneticAlgorithm} from './algorithm';
import {Chromosome} from './domain/Chromosome';
import {Population} from './domain/Population';
import {addAction} from '../interface/redux/slicers/actionsSlice';
import store from '../interface/redux/store';
import {setPath} from '../interface/redux/slicers/graphSlice';
import {ActionType} from "../interface/redux/extensions/enum/ActionType";

function getState<T>(source: T, type: "initial" | "infinite") : T {
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
    entity: Chromosome<string>,
    onSum: (first: T, second: T) => void,
    states: {initial: T, infinite: T},
    graph: Graph<T>,
    limits: Array<{name: keyof T, limit: number}>
) : number {
    const totalParamSum = graph.getTotalDistance(
        entity.gens, onSum, {initial: {...states.initial}, infinite: {...states.infinite}}
    ) as any
    const keys = Object.keys(totalParamSum)

    for (let i = 0; i < keys.length; i++) {
        const limit = limits.find((limit) => limit.name === keys[i])
        if (!limit) {
            continue
        }

        if (totalParamSum[limit.name] > limit.limit) {
            console.log(limit.name)
            return Number.NaN
        }
    }

    return 1 / totalParamSum[keys[0]]
}

function appendAction(title: string, startDate: Date, type: ActionType = ActionType.DEFAULT) {
    store.dispatch(
        addAction(
            [{title, startDate, type}],
        ),
    );
}

async function createNewPopulation<T>(
    graph: Graph<T>,
    startNodeId: string,
) {
    const paths: Array<Chromosome<string>> = []

    for (let i = 0; i < 50 + graph.links.length * 2; i++) {
        let path: Array<string> | undefined
        while (path === undefined) {
            try {
                path = await graph.createRandomPath(startNodeId)
                paths.push(new Chromosome(...path))
            } catch (e: any) {
                console.log('test')
                // if (e instanceof UnreachableEndError) {
                //     appendAction(
                //         `Произошла ошибка: ${e.message}`,
                //         new Date()
                //     )
                //     throw e
                // }
                // path = undefined
            }
        }
    }

    if (paths.length === 0) {
        const message = "End is unreachable (it is impossible to bypass all the " +
            "vertices once and return to the given one)"
        appendAction(message, new Date(), ActionType.ERROR)

        throw new Error(message)
    }

    return new Population(...paths);
}

/**
 * Runs a pre-configured genetic algorithm to solve the
 * traveling salesman problem
 * @param {Array<ReduxNodeObject>} nodesList list of available
 * vertices in the graph
 * @param {Array<ReduxLinkObject>} linksList list of available
 * links in the column
 * @param limits
 * @param {NodeEntity|undefined} startNode
 */
export async function startAlgorithm(
    nodesList: Array<ReduxNodeObject>,
    linksList: Array<ReduxLinkObject>,
    limits: Array<{name: string, limit: number}>,
    startNode?: NodeEntity,
) {
    const startDate = new Date();
    appendAction('Запускаем алгоритм', startDate)

    appendAction('Инициализируем функции', startDate)
    const initialState = getState(linksList[0].value, "initial")
    const infiniteState = getState(linksList[0].value, "infinite")
    const finishCondition = (population: Population<string>) =>
        population.entities
            .map((el) => calculateFitnessFor(el))
            .every((obj, _, array) =>
                obj === array[0] && array[0] !== Number.MAX_VALUE,
            );
    const onSum = <T, >(first: T, second: T) => {
        const [firstAsObj, secondAsObj] = [first as any, second as any]
        Object.keys(firstAsObj).forEach((key) => {
            if (typeof firstAsObj[key] === 'number') {
                firstAsObj[key] += secondAsObj[key]
            }
        })
    }
    const calculateFitnessFor = (chromosome: Chromosome<string>) =>
        fitnessFunction(
            chromosome,
            onSum,
            {initial: {...initialState}, infinite: {...infiniteState}},
            graph,
            limits
        )
    const calculateDistanceFor = (chromosome: Chromosome<string>) =>
        graph.getTotalDistance(
            chromosome.gens,
            onSum,
    {initial: {...initialState}, infinite: {...infiniteState}}
        )

    appendAction('Конвертируем элементы графа', startDate);
    const graph = initializeGraph(nodesList, linksList);
    const startNodeId = startNode ? startNode.id : graph.nodes.random().id

    appendAction('Создаём начальную популяцию', startDate)
    const initialPopulation = await createNewPopulation(graph, startNodeId);

    await geneticAlgorithm(
        0.01,
        1000,
        finishCondition,
        calculateFitnessFor,
        initialPopulation,
        graph,
        startNodeId
    ).then((res) => {
        const firstSuitable = res.entities
            .sort((a, b) =>
                calculateFitnessFor(b) - calculateFitnessFor(a)
            )
            .find((el) =>
                calculateFitnessFor(el) !== 1 / Number.MAX_VALUE
            )
        if (!firstSuitable) {
            appendAction("Подходящий путь не найден!", startDate, ActionType.ERROR)
            return
        }

        console.log(
            firstSuitable.gens
                .map((el) => graph.nodes.find((node) => node.id === el))
                .map((el) => el?.label),
        );

        appendAction('Алгоритм успешно завершил работу', startDate)
        store.dispatch(
            setPath({
                nodes: firstSuitable.gens,
                totalLength: calculateDistanceFor(firstSuitable)
            })
        );
    }).catch((err) => {
        appendAction('Произошла ошибка во время работы алгоритма', startDate, ActionType.ERROR)
        console.error(err);
    });
}
