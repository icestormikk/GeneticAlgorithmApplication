import {Population} from './domain/Population';
import {Chromosome} from './domain/Chromosome';
import {getRandomNumber} from './functions/arrayhelper';
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
    const [gen1, gen2] = [
        Math.round(getRandomNumber(1, parent1.length - 2)),
        Math.round(getRandomNumber(1, parent1.length - 2))
    ];
    const [startGen, endGen] = [Math.min(gen1, gen2), Math.max(gen1, gen2)];
    const offspring1: Array<T> = [], offspring2: Array<T> = []

    for (let i = startGen; i <= endGen; i++) {
        offspring1.push(parent1[i])
    }
    for (let i = 1; i < parent2.length - 1; i++) {
        if (!offspring1.includes(parent2[i])) {
            offspring2.push(parent2[i])
        }
    }

    const result = [parent1[0], ...offspring1.concat(offspring2), parent1[0]]
    return new Chromosome(...result);
}

/**
 * A method that performs calculations of the shortest path
 * in a graph using methods of genetic algorithms
 * @param mutationRate
 * @param maxGenerationsCount
 * @param {Function} finishCondition algorithm termination condition
 * @param {Function} fitnessFunction fitness function that will be
 * applied to each individual
 * @param {Population<number>} population initial population
 * @param graph
 * @param startNodeId
 * @return {Population<number>} a population with supposedly the most
 * suitable "individuals"
 * @template T
 * @template R
 */
export async function geneticAlgorithm<T>(
    mutationRate: number,
    maxGenerationsCount: number,
    finishCondition: (population: Population<string>) => boolean,
    fitnessFunction: (chromosome: Chromosome<string>) => number,
    population: Population<string>,
    graph: Graph<T>,
    startNodeId?: string
) {
    for (let i = 0; i < maxGenerationsCount; i++) {
        const newPopulation = new Population<string>()

        const tempPopulation = population
            .tournamentSelection(fitnessFunction, 2)
        while (newPopulation.entities.length !== population.entities.length) {
            const parents = tempPopulation.panmixia()
            const offspring = modifiedCrossover(
                parents.first.gens, parents.second.gens
            )

            if (Math.random() < mutationRate) {
                const tempChromosome = new Chromosome(...offspring.gens.slice(1, -1))
                tempChromosome.swappingMutation()

                const mutatedGens = [offspring.gens[0], ...tempChromosome.gens, offspring.gens[0]]
                offspring.gens.splice(0, offspring.gens.length, ...mutatedGens)
            }

            newPopulation.entities.push(offspring)
        }

        population = newPopulation
    }

    console.log(
        population.entities.map((en) => fitnessFunction(en))
    )

    return population;
}
