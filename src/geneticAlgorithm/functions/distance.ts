import {Chromosome} from '../domain/Chromosome';

declare module '../domain/Chromosome' {
    // eslint-disable-next-line no-unused-vars
    interface Chromosome<T> {
        /**
         * Calculates the {@link https://en.wikipedia.org/wiki/Hamming_distance| hamming distance} for
         * chromosomes with boolean values
         * @param {Chromosome<T>} chromosome
         * @template T
         */
        hammingDistance(
            this: Chromosome<boolean>, chromosome: Chromosome<boolean>
        ) : number

        /**
         * Calculates the {@link https://en.wikipedia.org/wiki/Euclidean_distance| Euclidean distance} for
         * chromosomes with real values
         * @param {Chromosome<T>} chromosome
         * @template T
         */
        euclideanDistance(
            this: Chromosome<number>, chromosome: Chromosome<number>
        ) : number
    }
}

Chromosome.prototype.hammingDistance =
    function(chromosome: Chromosome<boolean>) : number {
      return chromosome.gens.map((gen, index) =>
        this.gens[index] !== gen ? 1 : 0,
      ).reduce<number>((a, b) => a + b, 0);
    };

Chromosome.prototype.euclideanDistance =
    function(chromosome: Chromosome<number>) : number {
      return Math.sqrt(
          this.gens.map((value, index) =>
            Math.pow(chromosome.gens[index] - value, 2.0),
          ).reduce<number>((a, b) => a + b, 0),
      );
    };
