import {generateUUID} from 'three/src/math/MathUtils';

/**
 * A class representing a node in a graph
 */
export class NodeEntity {
    /**
     * Node Entity constructor
     * @param {string} id unique node id
     * @param {string} label the name of the node in the graph
     */
    constructor(
        public label: string,
        readonly id = generateUUID(),
    ) {
    }
}
