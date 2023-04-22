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
import {UnreachableEndError} from "./domain/exception/UnreachableEndError";

function buildInitialState<T>(source: T) : T {
    const castedSource = {...source} as any
    Object.keys(castedSource).forEach((key) => {
        if (typeof castedSource[key] === 'number') {
            castedSource[key] = 0
        }
    })

    return castedSource as T
}

function buildInfiniteState<T>(source: T) : T {
    const castedSource = {...source} as any
    Object.keys(castedSource).forEach((key) => {
        if (typeof castedSource[key] === 'number') {
            castedSource[key] = Number.NaN
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

function appendAction(title: string, startDate: Date) {
    store.dispatch(
        addAction(
            [{title, startDate}],
        ),
    );
}

async function createNewPopulation<T>(
    graph: Graph<T>,
    startNode?: NodeEntity,
) {
    const paths: Array<Chromosome<string>> = []

    for (let i = 0; i < graph.links.length + 1; i++) {
        let path: Array<string> | undefined
        while (path === undefined) {
            try {
                path = await graph.createRandomPath(startNode?.id)
                paths.push(new Chromosome(...path))
            } catch (e: any) {
                if (e instanceof UnreachableEndError) {
                    appendAction(
                        `Произошла ошибка: ${e.message}`,
                        new Date()
                    )
                    throw e
                }
                path = undefined
            }
        }
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
 * @param {NodeEntity|undefined} startNode IN DEV
 */
export async function startAlgorithm(
    nodesList: Array<ReduxNodeObject>,
    linksList: Array<ReduxLinkObject>,
    sortTarget: Array<string>,
    startNode?: NodeEntity,
) {
    const startDate = new Date();
    appendAction('Запускаем алгоритм', startDate)

    appendAction('Инициализируем функции', startDate)
    const initialState = buildInitialState(linksList[0].value)
    const infiniteState = buildInfiniteState(linksList[0].value)
    const finishCondition = (population: Population<string>) =>
        population.entities
            .map((el) => fitnessFunction(el))
            .every((obj, _, array) =>
                obj === array[0] && array[0] !== Number.MAX_VALUE,
            );
    const onDistance = (link: LinkEntity<{ distance: number }>) => link.value.distance;
    const fitnessFunction = (chromosome: Chromosome<string>) =>
        1.0 / graph.getTotalDistance(onDistance, ...chromosome.gens);

    appendAction('Конвертируем элементы графа', startDate);
    const graph = initializeGraph(nodesList, linksList);

    appendAction('Создаём начальную популяцию', startDate)
    const initialPopulation = await createNewPopulation(graph, startNode);
    console.log(
        initialPopulation
            .entities
            .map((entity) => graph.getTotalDistance(onDistance, ...entity.gens))
            .sort((a, b) => a - b)
    )

    geneticAlgorithm(
        finishCondition,
        fitnessFunction,
        initialPopulation,
        graph,
        startNode?.id
    ).then((res) => {
        console.log(graph.getTotalDistance(onDistance, ...res.entities[0].gens));
        console.log(
            res.entities[0].gens
                .map((el) => graph.nodes.find((node) => node.id === el))
                .map((el) => el?.label),
        );

        appendAction('Алгоритм успешно завершил работу', startDate)
        store.dispatch(
            setPath({
                nodes: res.entities[0].gens,
                totalLength: graph.getTotalDistance(onDistance, ...res.entities[0].gens)
            })
        );
    }).catch((err) => {
        appendAction('Произошла ошибка во время работы алгоритма', startDate)
        console.error(err);
    });
}
