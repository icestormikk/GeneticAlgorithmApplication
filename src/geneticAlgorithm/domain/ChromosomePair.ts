import {Pair} from './Pair';
import {Chromosome} from './Chromosome';

/**
 * Container
 */
export class ChromosomePair<T> extends Pair<Chromosome<T>, Chromosome<T>> {
  /**
   * Constructor
   * @param {Chromosome} chr1
   * @param {Chromosome} chr2
   */
  constructor(chr1: Chromosome<T>, chr2: Chromosome<T>) {
    super(chr1, chr2);
  }
}
