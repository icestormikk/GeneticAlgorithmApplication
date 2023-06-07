/**
 * A class representing a node in a graph
 */
export class NodeEntity {
    private static counter = 0;

    /**
     * Node Entity constructor
     * @param {string} id unique node id
     * @param {string} label the name of the node in the graph
     */
    constructor(
        public label: string,
        readonly id = NodeEntity.counter++
    ) {}
}
