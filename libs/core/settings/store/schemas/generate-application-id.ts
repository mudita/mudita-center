/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getMAC from "getmac"

export const generateApplicationId = (): string | null => {
  const maxApplicationIdLength = 16

  const mac = getMACOrNull()
  if (mac !== null) {
    const uniqueValue = mac.replace(/:/g, "").slice(-maxApplicationIdLength)
    const padLength = maxApplicationIdLength - uniqueValue.length
    const pad = Math.random().toString(16).slice(-padLength)
    return `${pad}${uniqueValue}`
  } else {
    return null
  }
}

const getMACOrNull = (): string | null => {
  try {
    return getMAC()
  } catch (ex) {
    return null
  }
}
