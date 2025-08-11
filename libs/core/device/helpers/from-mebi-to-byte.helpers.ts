/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const fromMebiToByte = (mebi: number): number => {
  const factor = 1048576
  return mebi * factor
}
