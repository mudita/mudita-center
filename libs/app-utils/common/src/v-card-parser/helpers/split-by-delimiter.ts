/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Splits text by delimiter, ignoring delimiter characters escaped with a
 * backslash and, where the text may carry them, placed inside double quotes.
 *
 * Only the double quote groups: it is the one RFC 6350 sec. 3.3 gives meaning
 * to, and only in a parameter value. An apostrophe is ordinary content - names
 * such as "O'Connor" are common - so it never suppresses a delimiter.
 * @param text - Text to split
 * @param delimiter - Delimiter or array of delimiters; delimiter must be a single character
 * @param options.quoteAware - Whether double quotes group the text; on by default,
 * turn it off for a property value, where a quote is content rather than a delimiter
 * @param options.stripQuotes - Whether a fully quoted part is returned without its
 * surrounding quotes; on by default, turn it off where the quotes belong to the value
 * @returns Array of strings split by delimiter
 */
export const splitByDelimiter = (
  text: string,
  delimiter: string | string[],
  {
    stripQuotes = true,
    quoteAware = true,
  }: { stripQuotes?: boolean; quoteAware?: boolean } = {}
) => {
  const delimiters = Array.isArray(delimiter) ? delimiter : [delimiter]
  let quoted = false
  let escapeNext = false

  const indexes = [0]

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (delimiters.includes(char) && !quoted && !escapeNext) {
      indexes.push(i + 1)
      continue
    }
    if (quoteAware && char === `"` && !escapeNext) {
      quoted = !quoted
    }
    escapeNext = char === "\\" && !escapeNext
  }

  return indexes.map((start, idx) => {
    const end = indexes[idx + 1] ? indexes[idx + 1] - 1 : text.length
    const part = text.slice(start, end)
    if (
      quoteAware &&
      stripQuotes &&
      part.length > 1 &&
      part.startsWith(`"`) &&
      part.endsWith(`"`)
    ) {
      return part.slice(1, -1)
    }
    return part
  })
}
