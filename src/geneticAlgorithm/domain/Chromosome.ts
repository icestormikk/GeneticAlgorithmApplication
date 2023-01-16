/**
 * The basis for creating classes of chromosomes containing
 * genes of a certain type
 */
export class Chromosome<T> {
  readonly id: number = Chromosome.entityCounter++;
  gens: Array<T>;

  private static entityCounter = 0;

  /**
   * Chromosome constructor
   * @param {Array<T>} gens array of gens
   * @template T
   */
  constructor(...gens: T[]) {
    if (gens.length === 0) {
      throw new Error('You cant create chromosome without genes!');
    } else {
      this.gens = gens;
    }
  }
}
