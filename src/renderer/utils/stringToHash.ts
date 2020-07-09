/* tslint:disable no-bitwise prettier */

/**
 * Converts string to numeric hash
 * @param {string} str - string to be converted
 * @returns {number}
 *
 * Please note:
 * This is a JS implementation of Java's String.hashCode() method, converted to function.
 * It looks utterly ugly but it's short and it gets the job done.
 * Reference: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */

const stringToHash = (str: string) => {
  let hash = 0
  const strLength = str.length

  if (strLength === 0) {
    return hash
  }

  for (let i = 0; i < strLength; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash &= hash // convert to 32bit integer
  }

  return hash
}

export default stringToHash
