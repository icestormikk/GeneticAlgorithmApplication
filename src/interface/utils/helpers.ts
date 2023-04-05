/**
 * Accepts an object and returns a human-readable representation of its values
 * @param {T} object the object whose values need to be translated
 * @return {string} human-readable representation of object values
 * @template T
 */
export function beautify<T>(object: T): string {
    return JSON.stringify(object, undefined, 2)
        .replace(/["{}\s]/ig, '')
        .replace(/,/ig, '\n')
        .replace(/:/ig, ': ');
}

/**
 * Accepts a string as an uuid and generates a number that is the sum of
 * the character codes in the passed string
 * @param {string} uuid a sequence of characters that is the uuid of an objeсt
 * @return {number} generated number
 */
export function buildNameFromUUID(uuid: string): number {
    return [...uuid.replace(/-/ig, '')].reduce((a, b) =>
        a + b.charCodeAt(0), 0,
    );
}
