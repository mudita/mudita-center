/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const unknownSerialNumber = "00000000000000"

export const isUnknownSerialNumber = (
  serialNumber: string | undefined = unknownSerialNumber
): boolean => {
  return serialNumber === unknownSerialNumber || serialNumber === ""
}
