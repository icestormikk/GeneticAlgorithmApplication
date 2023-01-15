import {Chromosome} from './Chromosome';

/**
 * A typed Population class containing "individuals" represented
 * as Chromosome objects with the corresponding type
 */
export class Population<T> {
  readonly id : number = Population.entityCounter++;
  entities : Array<Chromosome<T>>;

  private static entityCounter = 0;

  /**
   * Constructor of the Population object
   * @param {Array} entities chromosomes of the appropriate type
   */
  constructor(...entities: Chromosome<T>[]) {
    this.entities = entities;
  }

  /**
   * Adds one individual to the Population
   * @param {Chromosome} chromosome an individual represented
   * as a chromosome
   */
  addChromosome(chromosome: Chromosome<T>) {
    this.entities.push(chromosome);
  }

  /**
   * Adds several individuals to the population
   * @param {Chromosome[]} chromosomes a set of individuals
   * represented as chromosomes
   */
  addAllChromosomes(...chromosomes: Chromosome<T>[]) {
    chromosomes.forEach((chromosome) =>
      this.addChromosome(chromosome),
    );
  }

  /**
   * Removes one individual from the population for which
   * the condition passed in the <b>predicate</b> parameter is true
   * @param {Function} predicate condition for deletion
   */
  removeChromosomeIf(predicate: (chromosome: Chromosome<T>) => boolean) {
    const index = this.entities.findIndex(predicate);

    if (index > -1) {
      this.entities.splice(index, 1);
    }
  }

  /**
   * Removes individuals from the population for which the
   * condition passed in the predict parameter is true
   * @param {Function} predicate condition for deletion
   */
  removeChromosomesIf(predicate: (chromosome: Chromosome<T>) => boolean) {
    this.entities = this.entities.filter(
        (el) => !predicate(el),
    );
  }

  /**
   * Returns one individual from the selected population for which the
   * condition passed in the predicate parameter is met
   * @param {Function} predicate condition for selection
   * @return {Chromosome} -- the first individual for which the
   * transmitted condition is true
   */
  getChromosomeBy(
      predicate: (chromosome: Chromosome<T>) => boolean,
  ) : Chromosome<T> {
    return this.entities.filter(predicate)[0];
  }

  /**
   * Returns from the selected population all individuals for
   * which the condition passed in the predicate parameter is met
   * @param {Function} predicate condition for selection
   * @return {Array<Chromosome>} -- all individuals for which the
   * transmitted condition is true
   */
  getChromosomesBy(
      predicate: (chromosome: Chromosome<T>) => boolean,
  ) : Array<Chromosome<T>> {
    return this.entities.filter(predicate);
  }
}
