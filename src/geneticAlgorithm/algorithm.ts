import {Population} from './domain/Population';
import {Chromosome} from './domain/Chromosome';
import {getRandomNumber} from './functions/arrayhelper';
import store from "../interface/redux/store";
import {clearStepsInfo} from "../interface/redux/slicers/graphSlice";

/**
 * Modified version of default crossover
 * @param {Array<T>} parent1
 * @param {Array<T>} parent2
 * @template T
 */
export async function modifiedCrossover<T>(parent1: Array<T>, parent2: Array<T>) {
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
) {
    store.dispatch(clearStepsInfo())
    const steps = []
    for (let i = 0; i < maxGenerationsCount; i++) {
        const newPopulation = new Population<string>()

        const tempPopulation = await population
            .tournamentSelection(fitnessFunction, 2)
        while (newPopulation.entities.length !== population.entities.length) {
            const parents = await tempPopulation.panmixia()
            const offspring = await modifiedCrossover(
                parents.first.gens, parents.second.gens
            )

            if (Math.random() < mutationRate) {
                const tempChromosome = new Chromosome(...offspring.gens.slice(1, -1))
                await tempChromosome.swappingMutation()

                const mutatedGens = [offspring.gens[0], ...tempChromosome.gens, offspring.gens[0]]
                offspring.gens.splice(0, offspring.gens.length, ...mutatedGens)
            }

            newPopulation.entities.push(offspring)
        }

        population = newPopulation
        steps.push({
            generationNumber: i,
            generation: [...population.entities]
        })
    }

    return {progress: steps, result: population};
}
