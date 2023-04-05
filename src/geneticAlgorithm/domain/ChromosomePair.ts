import {Pair} from './Pair';
import {Chromosome} from './Chromosome';

/**
 * A tuple containing two chromosomes of the same type
 */
export class ChromosomePair<T> extends Pair<Chromosome<T>, Chromosome<T>> {
    /**
     * ChromosomePair constructor
     * @param {Chromosome<T>} chr1 the first chromosome
     * @param {Chromosome<T>} chr2 the second chromosome
     * @template T
     */
    constructor(chr1: Chromosome<T>, chr2: Chromosome<T>) {
        super(chr1, chr2);
    }

    /**
     * Translates a pair of chromosomes from the current representation
     * into an array of two elements
     * @return {Array<Chromosome<T>>} an array of two chromosomes
     */
    toArray(): Chromosome<T>[] {
        return [this.first, this.second];
    }
}
