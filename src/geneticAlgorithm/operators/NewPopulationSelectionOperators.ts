import {Chromosome} from '../domain/Chromosome';
import {Population} from '../domain/Population';
import {getRandomElementFrom} from './RecombinationOperators';
import {Pair} from '../domain/Pair';

const TEMPERATURE = 20.0;

declare module '../domain/Population' {
    interface Population<T> {
        /**
         * Among the individuals who have fallen "under the threshold", one
         * is randomly selected and recorded in a new population. The process
         * is repeated N times until the size of the new population is equal
         * to the size of the original population. The new population consists
         * only of individuals with high fitness, and the same individual may
         * occur several times, and some individuals with fitness above
         * the threshold may not get into the new population.
         * @param {number} threshold a number indicating which proportion of
         * individuals, starting from the very first (most suitable), will
         * take part in the selection
         * @param {Function} fitnessFunction a function that allows you to
         * measure the "fitness" of an individual (how suitable is the
         * proposed option)
         */
        truncationSelection(
            threshold: number,
            fitnessFunction: (chromosome: Chromosome<T>) => number
        ) : Population<T>
        /**
         * The members of the transferred population are evaluated, and then
         * N of the best (suitable) are selected from them, which will enter
         * the next generation.<br><b>N = number of individuals in the
         * population \* {@link passingEntitiesPercentage}</b>
         * @param {number} passingEntitiesPercentage percentage of the total
         * number of individuals that will fall into the new population
         * @param {Function} fitnessFunction a function that allows you to
         * measure the "fitness" of an individual (how suitable is the
         * proposed option)
         */
        eliteSelection(
            passingEntitiesPercentage: number,
            fitnessFunction: (chromosome: Chromosome<T>) => number
        ) : Population<T>
        /**
         * In this selection, the choice of an individual in a new
         * population depends not only on the size of its suitability,
         * but also on whether there is <b>already an individual with a
         * similar chromosome set in the population being formed</b>.
         * Of all individuals with the same fitness, preference
         * is first given to individuals with different genotypes.
         * @param {number} passingEntitiesPercentage percentage of the total
         * number of individuals that will fall into the new population
         * @param {Function} fitnessFunction a function that allows you to
         * measure the "fitness" of an individual (how suitable is the
         * proposed option)
         */
        exclusionSelection(
            passingEntitiesPercentage: number,
            fitnessFunction: (chromosome: Chromosome<T>) => number
        ) : Population<T>
        /**
         * In this method the probability of selection to a new
         * population depends on the control parameter — <b>temperature T</b>.
         * The probability of getting into a new population is calculated
         * using the following formula: <b>1 / (exp( (F(i) - F(j))/T ))</b>,
         * where <b>F(i)</b> and <b>F(j)</b> are the {@link fitnessFunction}
         * values calculated for i and j individuals, respectively
         * @param {number} passingEntitiesPercentage percentage of the total
         * number of individuals that will fall into the new population
         * @param {Function} fitnessFunction a function that allows you to
         * measure the "fitness" of an individual (how suitable is the
         * proposed option)
         */
        bolzmanSelection(
            passingEntitiesPercentage: number,
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
        passingEntitiesPercentage: number,
        fitnessFunction: (chromosome: Chromosome<T>) => number,
    ) : Population<T> {
      const count = Math.ceil(this.entities.length * passingEntitiesPercentage);
      const isValid = isPassingCountSuitable(this, count);
      if (!isValid.first) {
        throw new Error(isValid.second);
      }

      return new Population(
          ...this.entities
              .sort((a, b) =>
                fitnessFunction(b) - fitnessFunction(a),
              )
              .slice(0, count),
      );
    };

Population.prototype.exclusionSelection =
    function<T>(
        passingEntitiesPercentage: number,
        fitnessFunction: (chromosome: Chromosome<T>) => number,
    ) : Population<T> {
      const count = Math.ceil(this.entities.length * passingEntitiesPercentage);
      const isValid = isPassingCountSuitable(this, count);
      if (!isValid.first) {
        throw new Error(isValid.second);
      }

      const newPopulationEntities = this.entities
          .sort((a, b) =>
            fitnessFunction(b) - fitnessFunction(a),
          )
          .filter((chromosome, index, self) =>
            index === self.findIndex((t) => (
              t.gens.every((elem, genIndex) =>
                elem === chromosome.gens[genIndex],
              )
            )),
          )
          .slice(0, count);

      return new Population(...newPopulationEntities);
    };

Population.prototype.bolzmanSelection =
    function<T>(
        passingEntitiesPercentage: number,
        fitnessFunction: (chromosome: Chromosome<T>) => number,
    ) : Population<T> {
      const count = Math.ceil(this.entities.length * passingEntitiesPercentage);
      const isValid = isPassingCountSuitable(this, count);
      if (!isValid.first) {
        throw new Error(isValid.second);
      }

      const newPopulation = new Population<T>();
      for (let i = 0; i < count; i++) {
        const randomEntity1 = getRandomElementFrom(this.entities);
        const randomEntity2 = getRandomElementFrom(this.entities);
        const probability = 1.0 / (1.0 + Math.exp(
            fitnessFunction(randomEntity1) - fitnessFunction(randomEntity2),
        ) / TEMPERATURE);

        newPopulation.addChromosome(
            probability > Math.random() ? randomEntity1 : randomEntity2,
        );
      }

      return newPopulation;
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
