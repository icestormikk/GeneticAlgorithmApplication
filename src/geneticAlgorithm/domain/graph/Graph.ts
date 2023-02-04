import {NodeEntity} from './NodeEntity';
import {LinkEntity} from './LinkEntity';
import {getRandomElementFrom} from '../../operators';
import {generateUUID} from 'three/src/math/MathUtils';

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
      ...nodeIDs: Readonly<Array<number>>
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
   * @param {number|undefined} startNodeId id of the node that the path
   * should start from
   * @param {number|undefined} endNodeId id of the node where the path
   * should end
   * @param {boolean} isRepeatable will the IDs be repeated in the path
   * @return {Array<number>} a random path in the graph is an array of
   * node ids
   */
  createRandomPath(
      startNodeId?: number, endNodeId?: number, isRepeatable = false,
  ) : Array<number> {
    const startNode = this.nodes.find((el) => el.id === startNodeId);
    const endNode = this.nodes.find((el) => el.id === endNodeId);
    if (startNodeId && !startNode) {
      throw Error(`Node with id ${startNodeId} doesn't exist in graph`);
    }
    if (endNodeId && !endNode) {
      throw Error(`Node with id ${endNodeId} doesn't exist in graph`);
    }

    const path: Array<NodeEntity> = [];

    if (startNode) {
      path.push(startNode);
    }

    for (let i = 0; path.length < this.nodes.length; i++) {
      const availableNodes = isRepeatable ?
        this.nodes : this.nodes.filter((el) =>
          path.find((nd) => nd.id === el.id) === undefined,
        );
      const element = getRandomElementFrom(availableNodes);
      path.push(element);
    }

    // path.push(endNode ? endNode : getRandomElementFrom(this.nodes))

    return path.map((el) => el.id);
  }

  /**
   * Checks whether it is possible to get from one node of
   * the graph to another
   * @param {number} startNodeId id of the node where the path begins
   * @param {number} endNodeId id of the node where the path ends
   * @return {boolean} true if there is at least one path between
   * the knives, otherwise false
   */
  isReachable(startNodeId: number, endNodeId: number) : boolean {
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
