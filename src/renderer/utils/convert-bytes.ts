/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import round from "lodash/round"

interface ConvertBytesOptions {
  precision?: number
  fixedFractionDigits?: boolean
}

export const convertBytes = (
  bytes: number,
  { precision = 1, fixedFractionDigits = true }: ConvertBytesOptions = {}
): string => {
  const sizes = ["B", "KB", "MB", "GB", "TB"]

  if (bytes === 0) {
    return bytes + " " + sizes[0]
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024))

  if (i === 0) {
    return bytes + " " + sizes[i]
  }

  const value = bytes / 1024 ** i

  const returnedValue = fixedFractionDigits
    ? value.toFixed(precision)
    : round(value, precision)

  return returnedValue + " " + sizes[i]
}
