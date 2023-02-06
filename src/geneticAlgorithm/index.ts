/* eslint-disable no-unused-vars */
import {ReduxNodeObject} from '../interface/redux/extensions/ReduxNodeObject';
import {ReduxLinkObject} from '../interface/redux/extensions/ReduxLinkObject';
import {NodeEntity} from './domain/graph/NodeEntity';
import {LinkEntity} from './domain/graph/LinkEntity';
import {Graph} from './domain/graph/Graph';
import {geneticAlgorithm} from './algorithm';
import {Chromosome} from './domain/Chromosome';
import {Population} from './domain/Population';


/**
 * Runs a pre-configured genetic algorithm to solve the
 * traveling salesman problem
 * @param {Array<ReduxNodeObject>} nodesList list of available
 * vertices in the graph
 * @param {Array<ReduxLinkObject>} linksList list of available
 * links in the column
 */
export function startAlgorithm(
    nodesList: Array<ReduxNodeObject>, linksList: Array<ReduxLinkObject>,
) {
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

  const nodes = nodesList.map((el) =>
    new NodeEntity(el.label, el.id),
  );
  const links = linksList.map((el) =>
    new LinkEntity(el.source, el.target, el.value, el.id),
  );
  const graph = new Graph(nodes, links);
  const paths = [...Array(500).keys()]
      .map(() =>
        new Chromosome(...graph.createRandomPath()),
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
}
