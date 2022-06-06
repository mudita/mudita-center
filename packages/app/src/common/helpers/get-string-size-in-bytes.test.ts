/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getStringSizeInBytes } from "./get-string-size-in-bytes"

const testCases: [value: string, expectedBytesSize: number][] = [
  ["abc", 3],
  ["def♥𐍈Ą😂👍", 20],
  ["   \n", 4],
]
test.each(testCases)(
  "for string %p returns %p bytes",
  (value, expectedBytesSize) => {
    expect(getStringSizeInBytes(value)).toEqual(expectedBytesSize)
  }
)
