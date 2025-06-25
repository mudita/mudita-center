/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const getMAC = require("getmac").default

export const generateAnalyticsId = (): string | null => {
  const maxAnalyticsIdLength = 16

  const mac = getMACOrNull()
  if (mac !== null) {
    const uniqueValue = mac.replace(/:/g, "").slice(-maxAnalyticsIdLength)
    const padLength = maxAnalyticsIdLength - uniqueValue.length
    const pad = Math.random().toString(16).slice(-padLength)
    return `${pad}${uniqueValue}`
  } else {
    return null
  }
}

const getMACOrNull = (): string | null => {
  try {
    return getMAC()
  } catch {
    return null
  }
}
