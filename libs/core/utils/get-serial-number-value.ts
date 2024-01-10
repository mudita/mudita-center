/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const getSerialNumberValue = (
  serialNumber: string | undefined
): string => {
  if (serialNumber === undefined) {
    return ""
  }
  if (serialNumber === "00000000000000") {
    return ""
  }

  return serialNumber
}
