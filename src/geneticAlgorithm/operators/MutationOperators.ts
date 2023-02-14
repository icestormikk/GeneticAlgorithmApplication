import {Chromosome} from '../domain/Chromosome';
import {getRandomIndex} from '../functions/arrayhelper';

declare module '../domain/Chromosome' {
    interface Chromosome<T> {
        /**
         * Adds a new gene to the chromosome to the existing ones.
         * The gene value is selected randomly from the range
         * passed in the {@link possibleValues} parameter. The insertion
         * is performed by the index (passed in the parameter or
         * randomly)
         * @param possibleValues possible values of the new gene
         * @param specificIndex the index by which the gene will
         * be inserted
         */
        insertionMutation(
            possibleValues: Array<T>,
            specificIndex?: number
        ) : Chromosome<T>
        /**
         * Removes a random gene from a chromosome
         */
        removingMutation() : Chromosome<T>
        /**
         * Replaces a random gene in the chromosome with a
         * value randomly selected from the {@link possibleValues}
         * parameter
         * @param possibleValues possible values of the new gene
         */
        replacingMutation(
            possibleValues: Array<T>
        ) : Chromosome<T>
        /**
         * Exchange of places in the chromosome of two neighbors of
         * one randomly selected gene
         */
        swappingMutation() : Chromosome<T>,
        /**
         * Changes chromosome genes with real
         * values according to the formula: <b>GEN(I) = OLD_GEN(i) + A * B</b>,
         * where <b>OLD_GEN(i)</b> is the old value of the gene,
         * <b>A</b> = 0.5 * search space,
         * <b>B</b> - Σ(from i =1 to m, a(i) * 2^(-i)), <b>a(i)</b> = 1
         * with probability m, otherwise <b>a(i)</b> = 0, m is a parameter.
         * @param variableChangeStep the step of changing a real variable
         * @param parameter parameter involved in calculations
         */
        realValuedMutation(
            this: Chromosome<number>,
            variableChangeStep: number,
            parameter: number,
        ) : Chromosome<number>,
        /**
         * Random inversion of one gene (0 is replaced by 1 and vice versa)
         */
        binaryMutation(
            this: Chromosome<boolean>
        ) : Chromosome<boolean>
    }
}

Chromosome.prototype.insertionMutation =
    function<T>(
        possibleValues : Array<T>,
        specificIndex? : number,
    ) : Chromosome<T> {
      if (possibleValues.length === 0) {
        throw Error('There are 0 possible values');
      }

      const index = specificIndex || getRandomIndex(this.gens);
      const randomValue = possibleValues[getRandomIndex(possibleValues)];
      this.gens.splice(index, 0, randomValue);

      return this;
    };

Chromosome.prototype.removingMutation =
    function<T>() : Chromosome<T> {
      if (this.gens.length === 1) {
        throw new Error('It is impossible to delete a' +
            ' single gene in a chromosome');
      }

      const index = getRandomIndex(this.gens);
      this.gens.splice(index, 1);

      return this;
    };

Chromosome.prototype.swappingMutation =
    function<T>() : Chromosome<T> {
      const {length} = this.gens;
      if (length === 1) {
        throw new Error('It is impossible to apply swapping mutation ' +
            'to an chromosome with a single gene');
      }

      if (length < 3) {
        this.gens.reverse();
      } else {
        const indexes = Array
            .from({length: length - 2}, (_, i) => i + 1);
        const randomIndex = indexes[getRandomIndex(indexes)];
        [this.gens[randomIndex - 1], this.gens[randomIndex + 1]] =
            [this.gens[randomIndex + 1], this.gens[randomIndex - 1]];
      }

      return this;
    };

Chromosome.prototype.replacingMutation =
    function<T>(
        possibleValues: Array<T>,
    ) : Chromosome<T> {
      const randomGenIndex = getRandomIndex(this.gens);
      const randomPossibleValueIndex = getRandomIndex(possibleValues);
      this.gens[randomGenIndex] = possibleValues[randomPossibleValueIndex];

      return this;
    };

Chromosome.prototype.realValuedMutation =
    function(
        variableChangeStep: number,
        parameter: number,
    ) : Chromosome<number> {
      if (variableChangeStep <= 0) {
        throw new Error(`Variable change step can not be non-positive: 
            ${variableChangeStep}`);
      }

      const randomIndex = getRandomIndex(this.gens);
      const lowerCalculationBound = this.gens[randomIndex] - variableChangeStep;
      const topCalculationBound = this.gens[randomIndex] + variableChangeStep;
      const alpha = 0.5 * (topCalculationBound - lowerCalculationBound);
      const beta = Array
          .from({length: parameter}, (_, i) => i + 1)
          .map((el) =>
            (Math.random() > 1.0 / parameter ? 1 : 0) *
              Math.pow(2.0, -el),
          )
          .reduce<number>((a, b) => a + b, 0);

      this.gens[randomIndex] += (Math.random() >= 0.5 ? 1 : -1) * alpha * beta;

      return this;
    };

Chromosome.prototype.binaryMutation =
    function() : Chromosome<boolean> {
      const randomIndex = getRandomIndex(this.gens);
      this.gens[randomIndex] = !this.gens[randomIndex];
      return this;
    };
