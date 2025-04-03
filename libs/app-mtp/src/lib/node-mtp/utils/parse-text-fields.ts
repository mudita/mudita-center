/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { parseTextFromBuffer } from "./parse-text-from-buffer"

export const parseTextFields = <T extends string>(
  buffer: ArrayBuffer,
  textFieldKeys: readonly T[],
  currentOffset: number
): { [K in T]: string } => {
  return textFieldKeys.reduce((textFields, key, index) => {
    if (index === 0) {
      textFields[key] = parseTextFromBuffer(buffer, currentOffset)
    } else {
      const previousTextLength = (
        textFields[textFieldKeys[index - 1]] as string
      ).length

      const lengthPrefixOffset = 1
      const nullTerminatorSize = 1
      const utf8EncodingMultiplier = 2
      const encodedTextSize =
        previousTextLength === 0
          ? 0
          : (previousTextLength + nullTerminatorSize) * utf8EncodingMultiplier

      currentOffset = currentOffset + lengthPrefixOffset + encodedTextSize
      textFields[key] = parseTextFromBuffer(buffer, currentOffset)
    }
    return textFields
  }, {} as { [K in T]: string })
}
