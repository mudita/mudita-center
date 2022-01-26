/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import round from "lodash/round"

export const convertFromMebibytes = (mebibytesSize: number): string => {
  const bytesConversion = 1048576
  const sizes = ["B", "KB", "MB", "GB", "TB"]
  const bytes = mebibytesSize * bytesConversion

  if (bytes === 0) {
    return bytes + " " + sizes[0]
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1000))

  if (i === 0) {
    return bytes + " " + sizes[i]
  }
  const value = bytes / 1000 ** i

  const returnedValue = round(value, 1)

  return returnedValue + " " + sizes[i]
}
