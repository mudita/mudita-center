/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Splits text by delimiter, ignoring delimiters characters placed inside quotes
 * or escaped with backslash.
 * @param text - Text to split
 * @param delimiter - Delimiter or array of delimiters; delimiter must be a single character
 * @returns Array of strings split by delimiter
 */
export const splitByDelimiter = (
  text: string,
  delimiter: string | string[]
) => {
  const delimiters = Array.isArray(delimiter) ? delimiter : [delimiter]
  let quoteChar: string | null = null
  let escapeNext = false

  const indexes = [0]

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (delimiters.includes(char) && !quoteChar && !escapeNext) {
      indexes.push(i + 1)
      continue
    }
    if ((char === `"` || char === `'`) && !escapeNext) {
      if (quoteChar === null) {
        quoteChar = char
      } else if (quoteChar === char) {
        quoteChar = null
      }
    }
    escapeNext = char === "\\" && !escapeNext
  }

  return indexes.map((start, idx) => {
    const end = indexes[idx + 1] ? indexes[idx + 1] - 1 : text.length
    const part = text.slice(start, end)
    if (
      (part.startsWith(`"`) && part.endsWith(`"`)) ||
      (part.startsWith(`'`) && part.endsWith(`'`))
    ) {
      return part.slice(1, -1)
    }
    return part
  })
}
