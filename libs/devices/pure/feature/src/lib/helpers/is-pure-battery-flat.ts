/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const isPureBatteryFlat = (batteryLevel?: number): boolean => {
  return (batteryLevel ?? 100) < 5
}
