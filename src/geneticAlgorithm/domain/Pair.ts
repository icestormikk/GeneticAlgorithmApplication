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

  static fromArray<T>(source: Array<T>) : Pair<T, T> {
    if (source.length !== 2) {
      throw new Error(
          'It is impossible to create a pair from an array of elements with a length not equal to two'
      )
    }

    return new Pair(source[0], source[1])
  }
}
