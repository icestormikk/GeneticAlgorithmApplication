/**
 * A tuple storing only two values
 */
export class Pair<T, R> {
  first: T;
  second: R;

  /**
   * Pair constructor
   * @param {T} first first value
   * @param {R} second second value
   * @template T
   * @template R
   */
  constructor(first: T, second: R) {
    this.first = first;
    this.second = second;
  }
}
