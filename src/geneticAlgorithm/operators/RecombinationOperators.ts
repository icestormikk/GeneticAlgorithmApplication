import {Chromosome} from '../domain/Chromosome';
import {ChromosomePair} from '../domain/ChromosomePair';
import {Pair} from '../domain/Pair';
import {Population} from '../domain/Population';
import {getRandomIndex} from './MutationOperators';

const RECOMBINATION_MULTIPLIER = 0.25;

declare module '../domain/ChromosomePair' {
    interface ChromosomePair<T> {
        /**
         * A 2*N mask is made, according to which each gene of
         * the chromosome is randomly inherited by the first
         * and/or second special
         * @return A pair of chromosomes with randomly mixed genes
         */
        discreteRecombination(
            this: ChromosomePair<T>,
        ) : ChromosomePair<T>
        /**
         * The genes of both chromosomes change according to the formula:
         * <b>GEN(i) = PARENT1(i) + A*(PARENT2(i) - PARENT1(i))</b>,
         * where <b>GEN(i)</b> is the i-th gene of the descendant,
         * <b>PARENT1(i)</b> is the i-th gene of the first parent,
         * <b>PARENT2(i)</b> is the i-th gene of the second parent,
         * <b>A</b> is a dynamically changing parameter.<br>
         * A separate factor A is selected for each gene
         * @return A new pair of chromosomes with
         * altered genes
         */
        intermediateRecombination(
            this: ChromosomePair<number>,
        ) : ChromosomePair<number>
        /**
         * The functionality is similar to the intermediateRecombination(..)
         * function. It differs in that the multiplier A is <b>selected for
         * each descendant once</b>
         * @param firstChildMultiplier
         * @param secondChildMultiplier
         * @return A new pair of chromosomes with
         * altered genes
         * @see {@link intermediateRecombination}
         */
        lineRecombination(
            this: ChromosomePair<number>,
            firstChildMultiplier: number,
            secondChildMultiplier: number
        ) : ChromosomePair<number>
        /**
         * The boundary points are determined, which divide
         * the chromosomes into segments, after which chromosomes
         * exchange the genes lying inside these segments.
         * @param boundaryPoints points forming segments with
         * genes to exchange
         */
        multiPointCrossover(
            ...boundaryPoints: Array<number>
        ) : ChromosomePair<T>
        /**
         * A point inside the chromosome (the boundary point)
         * is randomly determined at which both chromosomes
         * divide into two parts and exchange them
         * @param boundaryPoint the point at which chromosomes divide
         */
        singlePointCrossover(
           boundaryPoint?: number
        ) : ChromosomePair<T>
        /**
         * Creates a mask (scheme) of an individual, in each locus of which
         * there is a potential crossing point. the mask genes are random binary
         * numbers (0 or 1). According to these values, the genome of the
         * descendant becomes the first (if the mask gene = 0) or the second
         * (if the mask gene = 1) parent individual
         */
        uniformCrossover(
            this: ChromosomePair<boolean>
        ) : ChromosomePair<boolean>

        /**
         * The functionality is similar to the uniformCrossover(..)
         * function.<br> It differs in that after selecting a pair of parents
         * from the rest of the population, an individual is randomly selected,
         * which is then used as a mask. Next, 10% of the mask genes mutate.
         * Then the genes of the first parent are compared with the genes of the
         * mask: if the genes are the same, they are transmitted to the first
         * descendant, otherwise the genes of the second parent are transferred
         * to the corresponding positions of the chromosome of the descendant.
         * The genotype of the second descendant differs from the genotype of
         * the first in that in those positions where the first descendant has
         * the genes of the first parent, the second descendant has the genes
         * of the second parent and vice versa.
         * @param population the population to which the parent individuals
         * belong
         * @see {@link uniformCrossover}
         */
        triadicCrossover(
            this: ChromosomePair<boolean>,
            population: Population<boolean>
        ) : ChromosomePair<boolean>
        /**
         * Individuals selected for crossing over randomly exchange genes.
         * Then a point is selected for a single-point crossing and
         * parts of chromosomes are exchanged. After crossing, the created
         * descendants are shuffled again.
         */
        shuffleCrossover() : ChromosomePair<T>
        /**
         * Performs a limited crossover. This is done by limiting the choice
         * of the boundary point: the cut points should appear only where the
         * genes differ.
         * @param boundaryPoints points forming segments with
         * genes to exchange
         */
        crossoverWithReducedSurrogate(
            ...boundaryPoints: Array<number>
        ) : ChromosomePair<T>
    }
}

ChromosomePair.prototype.discreteRecombination =
    function<T>() : ChromosomePair<T> {
      const parent1: Chromosome<T> = this.first;
      const parent2: Chromosome<T> = this.second;

      return new ChromosomePair(
          new Chromosome<T>(
              ...Array.from(Array(parent1.gens.length).keys())
                  .map((el, index) =>
                    (Math.random() >= 0.5 ? parent1 : parent2).gens[index],
                  ),
          ),
          new Chromosome<T>(
              ...Array.from(Array(parent1.gens.length).keys())
                  .map((el, index) =>
                    (Math.random() >= 0.5 ? parent1 : parent2).gens[index],
                  ),
          ),
      );
    };

ChromosomePair.prototype.intermediateRecombination =
    function() : ChromosomePair<number> {
      return recombinationWithMultiplier(this);
    };

ChromosomePair.prototype.lineRecombination =
    function(
        firstChildMultiplier: number,
        secondChildMultiplier: number,
    ) : ChromosomePair<number> {
      return recombinationWithMultiplier(
          this, firstChildMultiplier, secondChildMultiplier,
      );
    };

ChromosomePair.prototype.multiPointCrossover =
    function<T>(
        ...boundaryPoints: Array<number>
    ) : ChromosomePair<T> {
      const parent1 = this.first;
      const parent2 = this.second;
      const updatedBoundaryPoints = boundaryPoints
          .filter((point) => point >= 0 && point < parent1.gens.length)
          .filter((point, index, self) => self.indexOf(point) === index)
          .sort((a, b) => a - b);

      if (updatedBoundaryPoints.length === 0) {
        throw new Error('No suitable boundary points were found');
      }

      let swappingElements = new Pair(
          parent1.gens, parent2.gens,
      );
      chunked(updatedBoundaryPoints, 2).forEach((chunk) => {
        const updatedChunk = (chunk.length === 1) ?
              chunk.concat(parent1.gens.length - 1) :
              chunk;
        swappingElements = swapElementsInArrayByRange(
            new Pair(updatedChunk[0], updatedChunk[1]),
            swappingElements.first,
            swappingElements.second,
        );
      });

      return new ChromosomePair(
          new Chromosome(
              ...swappingElements.first,
          ),
          new Chromosome(
              ...swappingElements.second,
          ),
      );
    };

ChromosomePair.prototype.singlePointCrossover =
    function<T>(boundaryPoint?: number) : ChromosomePair<T> {
      const point = boundaryPoint || getRandomIndex(this.first.gens);
      return this.multiPointCrossover(point);
    };

ChromosomePair.prototype.uniformCrossover =
    function() : ChromosomePair<boolean> {
      const parent1 = this.first;
      const parent2 = this.second;
      const bitMask = [
        getArrayWithRandomNumbers(parent1.gens.length, 0, 1),
        getArrayWithRandomNumbers(parent1.gens.length, 0, 1),
      ];

      return new ChromosomePair(
          new Chromosome(
              ...bitMask[0].map((bit, index) =>
                ((bit === 1) ? parent1 : parent2).gens[index],
              ),
          ),
          new Chromosome(
              ...bitMask[1].map((bit, index) =>
                ((bit === 1) ? parent1 : parent2).gens[index],
              ),
          ),
      );
    };

ChromosomePair.prototype.triadicCrossover =
    function(
        population: Population<boolean>,
    ) : ChromosomePair<boolean> {
      const parent1 = this.first;
      const parent2 = this.second;
      const filteredPopulation = population.entities
          .filter((entity) =>
            entity.id !== parent1.id && entity.id !== parent2.id,
          );

      if (filteredPopulation.length === 0) {
        throw new Error('The population consists only of parent individuals');
      }
      const randomMaskEntity = getRandomElementFrom(filteredPopulation).gens;

      for (let i = 0; i < Math.ceil(randomMaskEntity.length * 0.1); i++) {
        const randomGenIndex = getRandomNumber(0, randomMaskEntity.length);
        randomMaskEntity[randomGenIndex] = !randomMaskEntity[randomGenIndex];
      }

      const descendant1gens: Array<boolean> = [];
      const descendant2gens: Array<boolean> = [];

      parent1.gens.forEach((gen, index) => {
        descendant1gens.push(
            gen === randomMaskEntity[index] ? gen : parent2.gens[index],
        );
        descendant2gens.push(
            gen === randomMaskEntity[index] ? parent2.gens[index] : gen,
        );
      });

      return new ChromosomePair(
          new Chromosome(...descendant1gens),
          new Chromosome(...descendant2gens),
      );
    };

ChromosomePair.prototype.shuffleCrossover =
    function<T>() : ChromosomePair<T> {
      const parent1 = this.first;
      const parent2 = this.second;

      shuffle(parent1, parent2);
      const descendants = this.multiPointCrossover(
          Math.floor(getRandomNumber(0, parent1.gens.length - 1)),
      );
      shuffle(descendants.first, descendants.second);

      return new ChromosomePair(descendants.first, descendants.second);
    };

ChromosomePair.prototype.crossoverWithReducedSurrogate =
    function<T>(
        ...boundaryPoints: Array<number>
    ): ChromosomePair<T> {
      const filteredBoundaryPoints = boundaryPoints
          .filter((el) =>
            this.first.gens[el] !== this.second.gens[el],
          );

      if (filteredBoundaryPoints.length === 0) {
        throw new Error('No suitable boundary points were found');
      }

      return this.multiPointCrossover(...filteredBoundaryPoints);
    };

const getRandomNumber = (min: number, max: number) : number =>
  Math.random() * (max - min) + min;

/**
 * Returns a random element from the passed array
 * @param {Array<T>} array an array from which to get a random element
 * @return {T} random element
 * @template T
 */
export function getRandomElementFrom<T>(array: Array<T>) : T {
  return array[getRandomIndex(array)];
}

/**
 * Creates an array of arrayLength length and fills it with
 * random values from 0 to max
 * @param {number} arrayLength length of the resulting array
 * @param {number} min minimum random value <b>(inclusive)</b>
 * @param {number} max maximum random value <b>(inclusive)</b>
 * @return {Array<number>} Array with random values
 */
function getArrayWithRandomNumbers(
    arrayLength: number,
    min: number,
    max: number,
) : Array<number> {
  return Array(arrayLength)
      .fill(undefined)
      .map(() => Math.round(Math.random() * (max - min) + min));
}

/**
 * Divides a one-dimensional array into chunks - arrays
 * of length equal to chunkSize
 * @param {Array<T>} array array to be split
 * @param {number} chunkSize size of one chunk
 * @return {Array<Array<T>>} array of chunks - arrays of
 * length equal to chunkSize
 * @template T
 */
function chunked<T>(array: Array<T>, chunkSize: number) : Array<Array<T>> {
  if (chunkSize < 1) {
    throw new Error('Chunk size must be positive!');
  }

  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
}

/**
 * swaps values inside the segment
 * @param {Pair<number, number>} range segment
 * including values to exchange <b>(borders included)</b>
 * @param {Chromosome<Array<T>>} gensParent1 genes of the
 * first parent individual
 * @param {Chromosome<Array<T>>} gensParent2 genes of the
 * second parent individual
 * @return {Pair<Array<T>, Array<T>>} sets of genes with
 * changed values within a segment
 * @template T
 */
function swapElementsInArrayByRange<T>(
    range: Pair<number, number>,
    gensParent1: Array<T>,
    gensParent2: Array<T>,
) : Pair<Array<T>, Array<T>> {
  if (range.first > range.second) {
    throw new Error(
        'The first value of the range must be less than the second',
    );
  }

  for (let i = range.first; i <= range.second; i++) {
    const replacingElement = gensParent1[i];
    gensParent1[i] = gensParent2[i];
    gensParent2[i] = replacingElement;
  }

  return new Pair(gensParent1, gensParent2);
}


/**
 * Randomly shuffles genes between two individuals
 * @param {Chromosome<T>} parent1 the first parent individual
 * @param {Chromosome<T>} parent2 the second parent individual
 * @template T
 */
function shuffle<T extends boolean>(
    parent1: Chromosome<T>,
    parent2: Chromosome<T>,
) {
  parent1.gens.forEach((elem, index) => {
    if (Math.random() >= 0.5) {
      const replacingElement = parent1.gens[index];
      parent1.gens[index] = parent2.gens[index];
      parent2.gens[index] = replacingElement;
    }
  });
}

/**
 * Performs the formation of offspring
 * individuals using the formula described in the
 * intermediateRecombination(..) function
 * @param {ChromosomePair<T>} parents parental individuals
 * @param {number} firstChildMultiplier multiplier for calculating
 * new gene values in the first individual
 * @param {number} secondChildMultiplier multiplier for calculating
 * new gene values in the second individual
 * @return {ChromosomePair<T>} individuals descendants with altered genes
 * @template T
 * @see {@link intermediateRecombination}
 * @see {@link makeRecombination}
 */
function recombinationWithMultiplier<T extends number>(
    parents: ChromosomePair<T>,
    firstChildMultiplier?: number,
    secondChildMultiplier?: number,
) : ChromosomePair<T> {
  const parent1 = parents.first;
  const parent2 = parents.second;

  return new ChromosomePair<T>(
      new Chromosome<T>(
          ...makeRecombination(
              parent1, parent2,
              firstChildMultiplier,
          ),
      ),
      new Chromosome<T>(
          ...makeRecombination(
              parent1, parent2,
              secondChildMultiplier,
          ),
      ),
  );
}

/**
 * Compiles a set of genes for a new individual,
 * applying to each gene the formula described in the
 * intermediateRecombination(..) function
 * @param {Chromosome<T>} parent1 the first individual involved in gene exchange
 * @param {Chromosome<T>} parent2 the second individual involved in gene
 * exchange
 * @param {number} multiplier the multiplier required to calculate the new
 * gene value
 * @return {Array} set of genes for a new individual
 * @template T
 * @see {@link intermediateRecombination}
 */
function makeRecombination<T extends number>(
    parent1 : Chromosome<T>,
    parent2 : Chromosome<T>,
    multiplier? : number,
) : Array<T> {
  const lowerBound = -RECOMBINATION_MULTIPLIER;
  const topBound = 1 - RECOMBINATION_MULTIPLIER;

  return parent1.gens.map((gen, index) => {
    const parent2value = parent2.gens[index];
    const randomValue = multiplier || getRandomNumber(lowerBound, topBound);

    return gen + randomValue * (parent2value - gen);
  }) as Array<T>;
}
