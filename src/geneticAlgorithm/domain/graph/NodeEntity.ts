/**
 * A class representing a node in a graph
 */
export class NodeEntity {
    public static counter = 0;
    public label: string

    /**
     * Node Entity constructor
     * @param {string} id unique node id
     */
    constructor(
        readonly id = NodeEntity.counter++
    ) {
        this.label = `Node-${id}`
    }
}
