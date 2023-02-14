import {NodeEntity} from './NodeEntity';
import {LinkEntity} from './LinkEntity';
import {getRandomElementFrom} from '../../functions/arrayhelper';
import {generateUUID} from 'three/src/math/MathUtils';
import {shuffle} from '../../functions/arrayhelper';

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

  /**
   * Calculates the total length of the path containing the passed nodes
   * @param {Function} onDistance a function that counts the distance
   * between two nodes
   * @param {Array<number>} nodeIDs list of unique node
   * identifiers in the graph
   * @return {number} total path length
   */
  getTotalDistance(
      onDistance: (link: LinkEntity<T>) => number,
      ...nodeIDs: Readonly<Array<string>>
  ) : number {
    let res = 0;

    for (let i = 0; i < nodeIDs.length - 1; i++) {
      const link = this.links.find((link) =>
        link.source == nodeIDs[i] && link.target == nodeIDs[i + 1],
      );

      if (!link) {
        return Number.MAX_VALUE;
      }

      res += onDistance(link);
    }

    return res;
  }

  /**
   * Returns a random set of note ids representing a path in the graph
   * @param {string|undefined} startNodeId id of the node that the path
   * should start from
   * @param {string|undefined} endNodeId id of the node where the path
   * should end
   * @param {boolean} isRepeatable will the IDs be repeated in the path
   * @return {Array<string>} a random path in the graph is an array of
   * node ids
   */
  async createRandomPath(
      startNodeId?: string, endNodeId?: string, isRepeatable = false,
  ) : Promise<Array<string>> {
    const startNode = this.nodes.find((el) => el.id === startNodeId);
    const endNode = this.nodes.find((el) => el.id === endNodeId);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    let finished = false;

    /**
     * Auxiliary recursive function for constructing a path in a graph
     * @param {string} nodeId id of the current node
     * @param {Array<string>} result the resulting array describing the path
     * @param {string|undefined} endId id of the final node
     */
    async function dfsHelper(
        nodeId: string, result: Array<string>, endId?: string,
    ) {
      if (endId && nodeId === endId && result.length > 1) {
        finished = true;
      }

      result.push(nodeId);
      const suitableLinks = self.links.filter((el) => el.source === nodeId);

      shuffle(suitableLinks).forEach((el) => {
        if (finished) {
          return;
        }

        if (isRepeatable) {
          if (result.length < self.nodes.length) {
            dfsHelper(el.target, result, endId);
          }
        } else {
          if (!result.includes(el.target)) {
            dfsHelper(el.target, result, endId);
          }
        }
      });
    }

    if (startNodeId && !startNode) {
      throw new Error(`Node with id ${startNodeId} doesn't exist in graph`);
    }
    if (endNodeId && !endNode) {
      throw new Error(`Node with id ${endNodeId} doesn't exist in graph`);
    }

    const result: Array<string> = [];
    await dfsHelper(
        startNodeId !== undefined ?
          startNodeId : getRandomElementFrom(this.nodes).id,
        result,
        endNodeId,
    );

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
  isReachable(startNodeId: string, endNodeId: string) : boolean {
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
  ) : boolean {
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
