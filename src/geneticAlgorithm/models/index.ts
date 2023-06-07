import {Population} from "../domain/Population";
import {Chromosome} from "../domain/Chromosome";
import {modifiedCrossover} from "../algorithm";
import {pathDistance} from "../functions/distance";

export async function canonical<T>(
    mutationProbability: number,
    crossoverProbability: number,
    population: Population<T>,
    fitnessFunction: (chromosome: Chromosome<T>) => number,
    maxPopulationCount: number
) {
    const steps: Array<Population<T>> = []
    for (let i = 0; i < maxPopulationCount; i++) {
        const parentsPopulation = await population.rouletteWheelSelection(
            fitnessFunction
        )
        const parents = await parentsPopulation.panmixia()
        const offspring = await modifiedCrossover(
            parents.first.gens, parents.second.gens
        )

        if (mutationProbability > Math.random()) {
            await offspring.swappingMutation()
        }

        const index = population.entities.findIndex((el) =>
            el.id === parents.first.id
        )
        population.entities.splice(
            index, 1, offspring
        )

        steps.push(new Population(...population.entities))
    }

    return {result: population, progress: steps}
}

export async function genitor<T>(
    mutationProbability: number,
    population: Population<T>,
    fitnessFunction: (chromosome: Chromosome<T>) => number,
    maxPopulationCount: number,
) {
    const steps: Array<Population<T>> = []
    for (let i = 0; i < maxPopulationCount; i++) {
        population.entities
            .sort((a, b) =>
                fitnessFunction(b) - fitnessFunction(a)
            )

        const parents = await population.panmixia()
        const offspring = await modifiedCrossover(
            parents.first.gens, parents.second.gens
        )

        if (Math.random() < mutationProbability) {
            await offspring.swappingMutation()
        }

        population.entities.splice(
            population.entities.length - 1, 1, offspring
        )

        steps.push(new Population(...population.entities))
    }

    return {progress: steps, result: population}
}

export async function chcAlgorithm<T>(
    mutationProbability: number,
    crossoverProbability: number,
    population: Population<T>,
    fitnessFunction: (chromosome: Chromosome<T>) => number,
    maxPopulationCount: number
) {
    const steps: Array<Population<T>> = []
    for (let i = 0; i < maxPopulationCount; i++) {
        const parents = population.outcrossing(pathDistance)

        const offspring = await modifiedCrossover(
            parents.first.gens, parents.second.gens
        )

        if (mutationProbability > Math.random()) {
            await offspring.swappingMutation()
        }

        population.entities.push(offspring)
        population.entities.sort((a, b) =>
            fitnessFunction(b) - fitnessFunction(a)
        )

        population.entities.slice(0, population.entities.length - 1)

        steps.push(new Population(...population.entities))
    }

    return {progress: steps, result: population}
}