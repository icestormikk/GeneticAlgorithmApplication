import {Chromosome} from './Chromosome';
import {generateUUID} from 'three/src/math/MathUtils';

/**
 * A typed Population class containing "individuals" represented
 * as Chromosome objects with the corresponding type
 */
export class Population<T> {
  readonly id : string = generateUUID();
  entities : Array<Chromosome<T>>;

  /**
   * Constructor of the Population object
   * @param {Array<T>} entities chromosomes of the appropriate type
   * @template T
   */
  constructor(...entities: Chromosome<T>[]) {
    this.entities = entities;
  }

  /**
   * Adds one individual to the Population
   * @param {Chromosome<T>} chromosome an individual represented
   * as a chromosome
   * @template T
   */
  addChromosome(chromosome: Chromosome<T>) {
    this.entities.push(chromosome);
  }

  /**
   * Adds several individuals to the population
   * @param {Chromosome<T>[]} chromosomes a set of individuals
   * represented as chromosomes
   * @template T
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
   * @return {Chromosome<T>} - the first individual for which the
   * transmitted condition is true
   * @template T
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
   * @return {Array<Chromosome<T>>} - all individuals for which the
   * transmitted condition is true
   * @template T
   */
  getChromosomesBy(
      predicate: (chromosome: Chromosome<T>) => boolean,
  ) : Array<Chromosome<T>> {
    return this.entities.filter(predicate);
  }
}
