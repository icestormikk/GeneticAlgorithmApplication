import {NodeEntity} from './NodeEntity';
import {LinkEntity} from './LinkEntity';
import {generateUUID} from 'three/src/math/MathUtils';
import {UnreachableEndError} from "../exception/UnreachableEndError";

/**
 * A class representing a graph that stores nodes and connections between them
 */
export class Graph<T> {
    readonly id: string = generateUUID();

    /**
     * Graph constructor
     * @param {Array<NodeEntity>} nodes array of nodes
     * @param {Array<LinkEntity>} links array of connections between nodes
     */
    constructor(
        public readonly nodes: Array<NodeEntity>,
        public readonly links: Array<LinkEntity<T>>,
    ) {}

    static createRandomGraph<T>(size: number) {
        const nodes = [...Array(size).keys()].map((el) => new NodeEntity(`Node-${el}`))
        const links: Array<LinkEntity<T>> = []

        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes.length; j++) {
                if (i !== j) {
                    links.push(
                        new LinkEntity(
                            nodes[i].id,
                            nodes[j].id,
                            {
                                distance: Math.round(Math.random() * 100),
                                cost: Math.round(Math.random() * 100),
                            } as T
                        )
                    )
                }
            }
        }

        return new Graph(nodes, links)
    }

    /**
     * Calculates the total length of the path containing the passed nodes
     * @param {Function} onSum a function that counts the distance
     * between two nodes
     * @param {Array<number>} path list of unique node
     * identifiers in the graph
     * @param states
     * @return {number} total path length
     */
    getTotalDistance(
        path: Array<string>,
        onSum: (first: T, second: T) => void,
        states: {
            initial: T, infinite: T
        }
    ) : T {
        const result = {...states.initial}

        for (let i = 0; i < path.length - 1; i++) {
            const suitableLink = this.links.find((el) =>
                el.source === path[i] && el.target === path[i + 1]
            )

            if (!suitableLink) {
                return states.infinite
            }

            onSum(result, suitableLink.value)
        }

        return result
    }

    /**
     * Returns a random set of note ids representing a path in the graph
     * @param {string|undefined} startNodeId id of the node that the path
     * should start from
     * @return {Array<string>} a random path in the graph is an array of
     * node ids
     */
    async createRandomPath(
        startNodeId?: string
    ): Promise<Array<string>> {
        const self = this;

        function validateNodeById(id: string): NodeEntity {
            const node = self.nodes.find((el) => el.id === id)
            if (!node) {
                throw new Error(`Node with ${startNodeId} id was not found!`)
            }

            return node
        }

        const startNode = startNodeId !== undefined
            ? validateNodeById(startNodeId)
            : this.nodes.random()
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let isCompleted = false;

        /**
         * Auxiliary recursive function for constructing a path in a graph
         * @param {string} currentNodeId id of the current node
         * @param {Array<string>} result the resulting array describing the path
         * @param {string|undefined} finalNodeId id of the final node
         */
        async function pathfinder(currentNodeId: string, result: Array<string>, finalNodeId: string) {
            result.push(currentNodeId)
            if (result.length === self.nodes.length) {
                const toEndNode = self.links.find((el) =>
                    el.source == currentNodeId && el.target === finalNodeId
                )
                if (!toEndNode) {
                    throw new UnreachableEndError(
                        'End is unreachable (it is impossible to bypass all the vertices once and return to the given one)'
                    )
                }

                result.push(toEndNode.target)
                isCompleted = true
                return
            }

            const suitableLinks = self.links.filter((el) => el.source === currentNodeId)
            for (const link of suitableLinks.shuffle()) {
                const isAlreadyInclude = result.find((node) => node === link.target) !== undefined

                if (!isAlreadyInclude && !isCompleted) {
                    await pathfinder(link.target, result, finalNodeId)
                    return
                }
            }

            throw new UnreachableEndError('End is unreachable (suitable links were not found)')
        }

        const result: Array<string> = [];
        await pathfinder(startNode.id, result, startNode.id);

        return result;
    }

    /**
     * Checks whether it is possible to get from one node of
     * the graph to another
     * @param {string} startNodeId id of the node where the path begins
     * @param {string} endNodeId id of the node where the path ends
     * @return {boolean} true if there is at least one path between
     * the knives, otherwise false
     */
    isReachable(startNodeId: string, endNodeId: string): boolean {
        const startNode = this.nodes.find((el) => el.id === startNodeId);
        if (!startNode) {
            throw Error(`Node with id ${startNodeId} doesn't exist in graph`);
        }

        const endNode = this.nodes.find((el) => el.id === endNodeId);
        if (!endNode) {
            throw Error(`Node with id ${endNodeId} doesn't exist in graph`);
        }

        return this.checkReachable(startNode, endNode, []);
    }

    /**
     * The functionality is similar to the function {@link isReachable}
     * @param {NodeEntity} startNode the node from which the path begins
     * @param {NodeEntity} endNode the node where the path should end
     * @param {Array<NodeEntity>} passedNodes list of nodes visited by
     * the algorithm
     * @private
     * @return {boolean} true if there is at least one path between
     * the knives, otherwise false
     */
    private checkReachable(
        startNode: NodeEntity, endNode: NodeEntity,
        passedNodes: Array<NodeEntity>,
    ): boolean {
        if (startNode.id === endNode.id) {
            return true;
        }

        const link = this.links.find((el) => el.source === startNode.id &&
            !passedNodes.find((node) => node.id === el.target));
        if (!link) {
            return false;
        }

        const newStartNode = this.nodes.find((el) => el.id === link.target);
        if (!newStartNode) {
            return false;
        }

        return this.checkReachable(
            newStartNode, endNode, [...passedNodes, startNode],
        );
    }
}
