import {Chromosome} from '../domain/Chromosome';
import {Population} from '../domain/Population';
import {getRandomElementFrom} from './RecombinationOperators';
import {Pair} from '../domain/Pair';

declare module '../domain/Population' {
    interface Population<T> {
        truncationSelection(
            threshold: number,
            fitnessFunction: (chromosome: Chromosome<T>) => number
        ) : Population<T>
        eliteSelection(
            passingEntitiesCount: number,
            fitnessFunction: (chromosome: Chromosome<T>) => number
        ) : Population<T>
        eliteSelection(
            passingEntitiesPercentage: number,
            fitnessFunction: (chromosome: Chromosome<T>) => number
        ) : Population<T>
        exclusionSelection(
            passingEntitiesCount: number,
            fitnessFunction: (chromosome: Chromosome<T>) => number
        ) : Population<T>
    }
}

Population.prototype.truncationSelection =
    function<T>(
        threshold: number,
        fitnessFunction: (chromosome: Chromosome<T>) => number,
    ) : Population<T> {
      if (!(threshold >= 0 && threshold <= 1)) {
        throw new Error('Threshold value must be in the range [0, 1]');
      }

      const newPopulation = new Population<T>();
      const mostSuitableIndividuals = this.entities
          .sort((a, b) =>
            fitnessFunction(b) - fitnessFunction(a),
          )
          .slice(0, Math.round(this.entities.length * threshold));

      while (newPopulation.entities.length !== this.entities.length) {
        newPopulation.entities.push(
            getRandomElementFrom(mostSuitableIndividuals),
        );
      }

      return newPopulation;
    };

Population.prototype.eliteSelection =
    function<T>(
        passingEntitiesCount: number,
        fitnessFunction: (chromosome: Chromosome<T>) => number,
    ) : Population<T> {
      const isValid = isPassingCountSuitable(this, passingEntitiesCount);
      if (!isValid.first) {
        throw new Error(isValid.second);
      }

      return new Population(
          ...this.entities
              .sort((a, b) =>
                fitnessFunction(b) - fitnessFunction(a),
              )
              .slice(0, passingEntitiesCount),
      );
    };

Population.prototype.eliteSelection =
    function<T>(
        passingEntitiesPercentage: number,
        fitnessFunction: (chromosome: Chromosome<T>) => number,
    ) : Population<T> {
      const isValid = isPassingPercentageSuitable(passingEntitiesPercentage);
      if (!isValid.first) {
        throw new Error(isValid.second);
      }

      return this.eliteSelection(
          Math.ceil(this.entities.length * passingEntitiesPercentage),
          fitnessFunction,
      );
    };

/**
 * dasdsadasdsadasd
 * @param {Population<T>} population sdadasdasd
 * @param {number} passingEntitiesCount asdsad
 * @return {Pair<boolean, string>} adasdasds
 * @template T
 */
function isPassingCountSuitable<T>(
    population: Population<T>,
    passingEntitiesCount: number,
) : Pair<boolean, string> {
  if (passingEntitiesCount < 1) {
    return new Pair(
        false,
        `Passing entities count can not be non-positive: 
        ${passingEntitiesCount}`,
    );
  }
  if (passingEntitiesCount > population.entities.length) {
    return new Pair(
        false,
        `Passing entities count can not be more than population 
        size: ${passingEntitiesCount}`,
    );
  }

  return new Pair(true, '');
}

/**
 * dasdasd
 * @param {number} passingEntitiesPercentage
 * @return {Pair<boolean, string>}
 */
function isPassingPercentageSuitable(
    passingEntitiesPercentage: number,
) : Pair<boolean, string> {
  if (!(passingEntitiesPercentage > 0.0 && passingEntitiesPercentage <= 1.0)) {
    return new Pair(
        false,
        `The percentage of passing entities should be in the range
         (0, 1]: ${passingEntitiesPercentage}`,
    );
  }

  return new Pair(true, '');
}
