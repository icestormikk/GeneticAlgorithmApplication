/* eslint-disable no-unused-vars */
import {ReduxNodeObject} from '../interface/redux/extensions/ReduxNodeObject';
import {ReduxLinkObject} from '../interface/redux/extensions/ReduxLinkObject';
import {NodeEntity} from './domain/graph/NodeEntity';
import {LinkEntity} from './domain/graph/LinkEntity';
import {Graph} from './domain/graph/Graph';
import {geneticAlgorithm} from './algorithm';
import {Chromosome} from './domain/Chromosome';
import {Population} from './domain/Population';
import {addAction, updateAction} from '../interface/redux/slicers/actionsSlice';
import store from '../interface/redux/store';
import {Action, ActionStatus} from '../interface/redux/extensions/Action';


/**
 * Runs a pre-configured genetic algorithm to solve the
 * traveling salesman problem
 * @param {Array<ReduxNodeObject>} nodesList list of available
 * vertices in the graph
 * @param {Array<ReduxLinkObject>} linksList list of available
 * links in the column
 */
export async function startAlgorithm(
    nodesList: Array<ReduxNodeObject>, linksList: Array<ReduxLinkObject>,
) {
  await store.dispatch(addAction([{title: 'Запускаем алгоритм'}]));

  // functions initialization
  const finishCondition = (population: Population<string>) =>
    population.entities
        .map((el) => 1.0 / graph.getTotalDistance(onDistance, ...el.gens))
        .every((obj, _, array) =>
          obj === array[0] && array[0] !== Number.MAX_VALUE,
        );
  const onDistance = (link: LinkEntity<{ distance: number }>) =>
    link.value.distance;
  const fitnessFunction = (chromosome: Chromosome<string>) =>
    1.0 / graph.getTotalDistance(onDistance, ...chromosome.gens);

  // graph components initialization
  const nodes = nodesList.map((el) =>
    new NodeEntity(el.label, el.id),
  );
  const links = linksList.map((el) =>
    new LinkEntity(el.source, el.target, el.value, el.id),
  );
  const graph = new Graph(nodes, links);
  const paths = await Promise.all(
      [...Array(1000).keys()]
          .map(async () => {
            const path = await graph.createRandomPath();

            return new Chromosome(...path);
          }),
  );
  const population = new Population(...paths);

  console.log(
      graph.getTotalDistance(
          onDistance, ...population.entities[0].gens,
      ),
  );
  geneticAlgorithm(
      5000,
      0.8,
      0.5,
      finishCondition,
      fitnessFunction,
      onDistance,
      population,
      graph,
  ).then((res) => {
    console.log(graph.getTotalDistance(onDistance, ...res.entities[0].gens));
    console.log(
        res.entities[0].gens
            .map((el) => nodes.find((node) => node.id === el))
            .map((el) => el?.label),
    );
  }).catch((err) => {
    console.log(err);
  });
  const actions = store.getState().actions.items;
  const act: Action = JSON.parse(
      JSON.stringify(
          actions[actions.length - 1],
      ),
  );
  act.status = ActionStatus.SUCCESS;
  act.title = 'Готово';
  store.dispatch(updateAction(act));
}
