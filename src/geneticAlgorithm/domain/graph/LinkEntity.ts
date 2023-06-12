import {generateUUID} from 'three/src/math/MathUtils';

/**
 * A class representing an entity linking nodes in a graph
 */
export class LinkEntity<T> {
    /**
     * Link Entity constructor
     * @param {string} id unique link id
     * @param {string} source id of the node from which the link will originate
     * @param {string} target id of the node to which the link will be directed
     * @param {T} value an object that stores information about the path
     * between two nodes
     * @template T
     */
    constructor(
        public readonly source: number,
        public readonly target: number,
        public value: T,
        readonly id = generateUUID(),
    ) {}
}
