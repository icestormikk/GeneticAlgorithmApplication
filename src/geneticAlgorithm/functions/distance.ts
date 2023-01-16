import {Chromosome} from '../domain/Chromosome';

/**
 * Calculates the {@link https://en.wikipedia.org/wiki/Hamming_distance| hamming distance} for
 * chromosomes with boolean values
 * @param {Chromosome<T>} chromosome1 the first chromosome to calculate
 * @param {Chromosome<T>} chromosome2 the second chromosome to calculate
 * @return {number} hamming distance (number of different gens)
 * @template T
 */
export function hammingDistance(
    chromosome1: Chromosome<boolean>, chromosome2: Chromosome<boolean>,
) : number {
  return chromosome2.gens.map((gen, index) =>
        chromosome1.gens[index] !== gen ? 1 : 0,
  ).reduce<number>((a, b) => a + b, 0);
}

/**
 * Calculates the {@link https://en.wikipedia.org/wiki/Euclidean_distance| Euclidean distance} for
 * chromosomes with real values
 * @param {Chromosome<T>} chromosome1 the chromosome from which the distance
 * is calculated
 * @param {Chromosome<T>} chromosome2 the chromosome to which the distance
 * is considered
 * @return {number} euclidean distance
 * @template T
 */
export function euclideanDistance(
    chromosome1: Chromosome<number>, chromosome2: Chromosome<number>,
) : number {
  return Math.sqrt(
      chromosome1.gens.map((value, index) =>
        Math.pow(chromosome2.gens[index] - value, 2.0),
      ).reduce<number>((a, b) => a + b, 0),
  );
}
