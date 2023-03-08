import {Population} from '../domain/Population';
import {ChromosomePair} from '../domain/ChromosomePair';
import {getRandomNumber} from '../functions/arrayhelper';
import {Pair} from '../domain/Pair';
import {Chromosome} from '../domain/Chromosome';

declare module '../domain/Population' {
    interface Population<T> {
        /**
         * Each individual in the population is randomly matched
         * to another individual from the same population
         */
        panmixia() : ChromosomePair<T>,
        /**
         * The first parent is chosen randomly, and the second parent
         * is the member of the population closest to the first.
         * Here "closest" means that the individual has the minimum
         * value of the {@link distanceFunction}
         * @param {Function} distanceFunction a function that evaluates the
         * "proximity" of two chromosomes
         */
        inbreeding(
            distanceFunction: (
                chromosome1: Chromosome<T>, chromosome: Chromosome<T>
            ) => number
        ) : ChromosomePair<T>
        /**
         * The concept of similarity of individuals is used. The functionality
         * is similar to the inbreeding(..) function, but now mating pairs are
         * formed from the most distant individuals.
         * @param distanceFunction a function that evaluates the
         * "proximity" of two chromosomes
         * @see {@link inbreeding}
         */
        outcrossing(
            distanceFunction: (
                chromosome1: Chromosome<T>, chromosome: Chromosome<T>
            ) => number
        ) : ChromosomePair<T>
        /**
         * From a population containing N individuals, {@link tournamentSize}
         * individuals are randomly selected, and the best individual of them
         * is recorded in an intermediate array. This operation is repeated
         * N times
         * @param tournamentSize the number of the tournament (the number of
         * individuals participating in the tournament at the same time)
         * @param fitnessFunction a function that evaluates the
         * "proximity" of two chromosomes
         */
        tournamentSelection(
            tournamentSize: number,
            fitnessFunction: (chromosome: Chromosome<T>) => number
        ) : Population<T>
        /**
         * Individuals are selected using N "roulette runs", where N is the
         * <b>population size</b>. The roulette wheel contains one sector
         * for each member of the population. With this selection, members of a
         * population with higher fitness are more likely to be selected
         * more often than individuals with low fitness.
         * @param fitnessFunction
         */
        rouletteWheelSelection(
            fitnessFunction: (chromosome: Chromosome<T>) => number
        ) : Promise<Population<T>>
    }
}

Population.prototype.panmixia =
    function<T>() : ChromosomePair<T> {
      return new ChromosomePair(
          this.entities.random(), this.entities.random(),
      );
    };

Population.prototype.inbreeding =
    function<T>(
        distanceFunction: (
            chromosome1: Chromosome<T>, chromosome: Chromosome<T>
        ) => number,
    ) : ChromosomePair<T> {
      return chooseDescendatsAlgorithm(
          this, distanceFunction, true,
      );
    };

Population.prototype.outcrossing =
    function<T>(
        distanceFunction: (
            chromosome1: Chromosome<T>, chromosome: Chromosome<T>
        ) => number,
    ) : ChromosomePair<T> {
      return chooseDescendatsAlgorithm(
          this, distanceFunction, false,
      );
    };

Population.prototype.tournamentSelection =
    function<T>(
        tournamentSize = 2,
        fitnessFunction: (chromosome: Chromosome<T>) => number,
    ) : Population<T> {
      const newPopulation = new Population<T>();

      for (let i = 0; i < this.entities.length; i++) {
        const randomEntities: Array<Chromosome<T>> = [];

        while (randomEntities.length != tournamentSize) {
          randomEntities.push(this.entities.random());
        }

        newPopulation.addChromosome(
            randomEntities.sort((a, b) =>
              fitnessFunction(b) - fitnessFunction(a),
            )[0],
        );
      }

      return newPopulation;
    };

Population.prototype.rouletteWheelSelection =
    async function<T>(
        fitnessFunction: (chromosome: Chromosome<T>) => number,
    ) : Promise<Population<T>> {
      const newPopulation = new Population<T>();
      const totalFitness = (await Promise.all(
          this.entities
              .map(async (el) => fitnessFunction(el)),
      )).reduce((a, b) => a + b, 0);

      for (let i = 0; i < this.entities.length; i++) {
        const wheelRandomValue = getRandomNumber(0, Math.abs(totalFitness));
        let sum = 0;
        for (const chromosome of this.entities) {
          sum += fitnessFunction(chromosome);
          if (sum >= wheelRandomValue) {
            newPopulation.addChromosome(chromosome);
            break;
          }
        }
      }

      return newPopulation;
    };

function chooseDescendatsAlgorithm<T>(
    population: Population<T>,
    onDistance: (
        chromosome1: Chromosome<T>, chromosome2: Chromosome<T>
    ) => number,
    isInbreeding: boolean,
) : ChromosomePair<T> {
  const parent1 = population.entities.random();
  const parent2 = population.entities
      .filter((el) =>
        el.id !== parent1.id,
      )
      .map((el) =>
        new Pair(el, onDistance(parent1, el)),
      )
      .sort((a, b) =>
        (isInbreeding ? a.second - b.second : b.second - a.second),
      );

  return new ChromosomePair(
      parent1,
      parent2[0].first,
  );
}
