/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export function waitUntil(
  condition: () => boolean,
  interval: number = 100
): Promise<void> {
  return new Promise<void>((resolve) => {
    const checkCondition = () => {
      if (condition()) {
        resolve()
      } else {
        setTimeout(checkCondition, interval)
      }
    }
    checkCondition()
  })
}
