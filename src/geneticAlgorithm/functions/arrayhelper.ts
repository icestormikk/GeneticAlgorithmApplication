declare global {
    interface Array<T> {
        /**
         * Returns a random element from the passed array
         * @param {Array<T>} array an array from which to get a random element
         * @return {T} random element
         * @template T
         */
        random: () => T
        /**
         * Returns the index of a random array element
         * @return {number} random index
         */
        randomIndex: () => number
        /**
         * Shuffles the elements of the passed array in random order
         * @param {Array<T>} array array whose objects need to be shuffled
         * @return {Array<T>} source array with mixed objects
         * @template T
         */
        shuffle: () => Array<T>
    }
}

Array.prototype.random = function <T>(): T {
    const randomIndex = Math.floor(Math.random() * this.length)
    return this[randomIndex]
}

Array.prototype.shuffle = function <T>(): Array<T> {
    let {length} = this;
    let index: number;

    while (length) {
        index = Math.floor(Math.random() * length--);
        const temp = this[length];
        this[length] = this[index];
        this[index] = temp;
    }

    return this;
}

export const getRandomNumber = (min: number, max: number): number =>
    Math.random() * (max - min) + min;

