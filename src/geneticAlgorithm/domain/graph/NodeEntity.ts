import {generateUUID} from 'three/src/math/MathUtils';

/**
 * A class representing a node in a graph
 */
export class NodeEntity {
  readonly id: string = generateUUID();

  /**
   * Node Entity constructor
   * @param {string} label the name of the node in the graph
   */
  constructor(public label: string) {}
}
