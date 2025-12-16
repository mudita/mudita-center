/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { splitByDelimiter } from "./split-by-delimiter"

/**
 * Removes surrounding quotation marks from a string if they are present.
 * @param input - The input string to process.
 * @returns The input string without surrounding quotation marks.
 */
export const clearQuotationMarks = (input = "") => {
  const trimmedInput = input.trim()
  const firstChar = trimmedInput.charAt(0)

  if (!['"', "'"].includes(firstChar)) {
    return trimmedInput
  }

  const parts = splitByDelimiter(trimmedInput, firstChar)
  if (parts.length === 3) {
    return parts[1]
  }

  return trimmedInput
}
