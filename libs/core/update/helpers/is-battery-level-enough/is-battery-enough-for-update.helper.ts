/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const isBatteryLevelEnoughForUpdate = (
  batteryLevel: number
): boolean => {
  if (batteryLevel > 1) {
    throw new Error("Battery level should not be higher than 1")
  }

  return batteryLevel * 100 >= 40
}
