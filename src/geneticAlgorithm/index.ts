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

async function createNewPopulation(
    graph: Graph<any>,
    startNode?: NodeEntity,
    endNode?: NodeEntity
) {
    const paths: Array<Chromosome<string>> = []

    for (let i = 0; i < 1000; i++) {
        try {
            const path = await graph.createRandomPath(startNode?.id, endNode?.id)
            paths.push(new Chromosome(...path))
        } catch (e: any) {
            console.log(`Error while rendering: ${e.message}`)
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
    startNode?: NodeEntity,
) {
    const startDate = new Date();
    appendAction('?????????????????? ????????????????', startDate)

    appendAction('???????????????????????????? ??????????????', startDate)
    const finishCondition = (population: Population<string>) =>
        population.entities
            .map((el) => 1.0 / graph.getTotalDistance(onDistance, ...el.gens))
            .every((obj, _, array) =>
                obj === array[0] && array[0] !== Number.MAX_VALUE,
            );
    const onDistance = (link: LinkEntity<{ distance: number }>) => link.value.distance;
    const fitnessFunction = (chromosome: Chromosome<string>) =>
        1.0 / graph.getTotalDistance(onDistance, ...chromosome.gens);

    appendAction('???????????????????????? ???????????????? ??????????', startDate);
    const graph = initializeGraph(nodesList, linksList);

    appendAction('?????????????? ?????????????????? ??????????????????', startDate)
    const population = await createNewPopulation(graph, startNode);

    appendAction('?????????????????? ????????????????', startDate)
    console.log(
        population
            .entities
            .map((entity) => graph.getTotalDistance(onDistance, ...entity.gens))
            .sort((a, b) => a - b)
    )
    geneticAlgorithm(
        5000,
        0.8,
        0.5,
        finishCondition,
        fitnessFunction,
        onDistance,
        population,
    ).then((res) => {
        console.log(graph.getTotalDistance(onDistance, ...res.entities[0].gens));
        console.log(
            res.entities[0].gens
                .map((el) => graph.nodes.find((node) => node.id === el))
                .map((el) => el?.label),
        );
        appendAction('???????????????? ?????????????? ???????????????? ????????????', startDate)
        store.dispatch(setPath(res.entities[0].gens));
    }).catch((err) => {
        appendAction('?????????????????? ???????????? ???? ?????????? ???????????? ??????????????????', startDate)
        console.error(err);
    });
}
