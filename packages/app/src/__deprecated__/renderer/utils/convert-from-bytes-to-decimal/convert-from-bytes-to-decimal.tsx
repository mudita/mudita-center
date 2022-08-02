/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import round from "lodash/round"

export const convertFromBytesToDecimal = (bytes: number): string => {
  const sizes = ["B", "KB", "MB", "GB", "TB"]

  if (bytes === 0) {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return bytes + " " + sizes[0]
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1000))

  if (i === 0) {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return bytes + " " + sizes[i]
  }
  const value = bytes / 1000 ** i

  const returnedValue = round(value, 1)

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return returnedValue + " " + sizes[i]
}
