import {Population} from './domain/Population';
import {Chromosome} from './domain/Chromosome';
import {getRandomNumber} from './functions/arrayhelper';
import {LinkEntity} from './domain/graph/LinkEntity';
import {Graph} from "./domain/graph/Graph";

// /**
//  * Get a random index from an array of elements
//  * @param {Array} array array of elements
//  * @return {number} random index
//  */
// function getRandomIndex(array: Array<unknown>) : number {
//   return Math.round(Math.random() * (array.length - 1));
// }

// const recycleArray = (array: Array<number>, index: number) => {
//   const idx = index ? index : getRandomIndex(array);
//   const res = [];
//   for (let i = 0; i < array.length; i++) {
//     res[i] = array[(idx + i) % array.length];
//   }
//   return res;
// };

/**
 * Modified version of default crossover
 * @param {Array<T>} parent1
 * @param {Array<T>} parent2
 * @template T
 */
function modifiedCrossover<T>(parent1: Array<T>, parent2: Array<T>) {
    const gen1 = getRandomNumber(0, parent1.length - 1);
    const gen2 = getRandomNumber(0, parent2.length - 1);
    const startGen = Math.min(gen1, gen2);
    const endGen = Math.max(gen1, gen2);
    const offspring: Array<T> = Array(parent1.length).fill(-1);

    for (let i = startGen; i <= endGen; i++) {
        offspring[i] = parent1[i];
    }
    parent2.forEach((el) => {
        const index = offspring.findIndex((el) => el === -1);
        if (!offspring.includes(el)) {
            offspring[index] = el;
        }
    });
    return offspring;
}

/**
 * A method that performs calculations of the shortest path
 * in a graph using methods of genetic algorithms
 * @param {number} maxGenerationsCount maximum number of populations
 * (number of repetitions of selection and mutation cycles)
 * @param {number} mutationProbability the probability of mutations
 * in the offspring
 * @param {number} elitePercentage the percentage of individuals that,
 * when sorted, will participate in reproduction
 * @param {Function} finishCondition algorithm termination condition
 * @param {Function} fitnessFunction fitness function that will be
 * applied to each individual
 * @param {Function} onDistance a function that calculates the length
 * of a path in a graph
 * @param {Population<number>} population initial population
 * @return {Population<number>} a population with supposedly the most
 * suitable "individuals"
 * @template T
 * @template R
 */
export async function geneticAlgorithm<T>(
    maxGenerationsCount: number,
    mutationProbability: number,
    elitePercentage: number,
    finishCondition: (population: Population<string>) => boolean,
    fitnessFunction: (chromosome: Chromosome<string>) => number,
    onDistance: (link: LinkEntity<T>) => number,
    population: Population<string>,
    graph: Graph<T>,
    startNodeId?: string
) {
    for (;!finishCondition(population);) {
        let newGens = undefined

        while (!newGens) {
            try {
                newGens = await graph.createRandomPath(startNodeId, startNodeId)
            } catch (e) {
                newGens = undefined
            }
        }

        const newEntity = new Chromosome(...newGens)

        population.entities.sort((a, b) =>
            fitnessFunction(b) - fitnessFunction(a),
        );
        population.entities.splice(
            population.entities.length - 1, 1, newEntity
        )
    }

    console.log(
        population.entities.map((en) => fitnessFunction(en))
    )

    return population;
}
