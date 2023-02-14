/**
 * Shuffles the elements of the passed array in random order
 * @param {Array<T>} array array whose objects need to be shuffled
 * @return {Array<T>} source array with mixed objects
 * @template T
 */
export function shuffle<T>(array: Array<T>) : Array<T> {
  let {length} = array;
  let index: number;

  while (length) {
    index = Math.floor(Math.random() * length--);
    const temp = array[length];
    array[length] = array[index];
    array[index] = temp;
  }

  return array;
}

/**
 * Get a random index from an array of elements
 * @param {Array} array array of elements
 * @return {number} random index
 */
export function getRandomIndex(array: Array<unknown>) : number {
  return Math.round(Math.random() * (array.length - 1));
}

export const getRandomNumber = (min: number, max: number) : number =>
  Math.random() * (max - min) + min;

/**
 * Returns a random element from the passed array
 * @param {Array<T>} array an array from which to get a random element
 * @return {T} random element
 * @template T
 */
export function getRandomElementFrom<T>(array: Array<T>) : T {
  return array[getRandomIndex(array)];
}

/**
 * Applies the {@link onPass} function to an array and
 * returns a new filtered array
 * @param {Array<T>} array array based on which filtering
 * will be performed
 * @param {Function} onPass function for filtering
 * @return {Array<T>} a new array containing only elements that
 * have passed the {@link onPass} check
 * @template T
 */
export function getFilteredArray<T>(
    array: Array<T>,
    onPass: (element: T) => boolean,
) : Array<T> {
  return array.filter(onPass);
}
