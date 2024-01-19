/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { unknownSerialNumber } from "Core/device/constants/unknown-serial-number.constant"

export const getSerialNumberValue = (
  serialNumber: string = unknownSerialNumber
): string => {
  return serialNumber === unknownSerialNumber ? "" : serialNumber
}
