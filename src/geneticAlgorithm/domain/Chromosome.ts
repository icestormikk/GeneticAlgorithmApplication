import {generateUUID} from 'three/src/math/MathUtils';

/**
 * The basis for creating classes of chromosomes containing
 * genes of a certain type
 */
export class Chromosome<T> {
    readonly id: string = generateUUID();
    gens: Array<T>;

    /**
     * Chromosome constructor
     * @param {Array<T>} gens array of gens
     * @template T
     */
    constructor(...gens: T[]) {
        this.gens = gens;
    }
}
