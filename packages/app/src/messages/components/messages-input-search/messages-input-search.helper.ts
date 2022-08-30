/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const searchResultFormatter = (
  text: string,
  query: string,
  totalSymbols = 36
): string => {
  const wordIndex = text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())
  const wordLength = query.length
  const freeLength = totalSymbols - wordLength

  const leftOffset = wordIndex - Math.floor(freeLength / 2) - 3
  const rightOffset = wordIndex + wordLength + Math.floor(freeLength / 2) - 3
  const firstPart = text.slice(leftOffset > 0 ? leftOffset : 0, wordIndex)
  const secondPart = text.slice(
    wordIndex + wordLength,
    rightOffset <= text.length ? rightOffset : text.length
  )

  if (text.length <= totalSymbols) {
    if (wordIndex < 0) {
      return text
    } else {
      return [firstPart, `<strong>${query}</strong>`, secondPart].join("")
    }
  }

  if (wordIndex < 0) {
    return [text.slice(0, totalSymbols), "..."].join("")
  } else {
    return [
      "...",
      firstPart,
      `<strong>${query}</strong>`,
      secondPart,
      "...",
    ].join("")
  }
}
