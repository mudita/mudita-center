/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const displaySpace = (space: number): string => {
  const value =
    space >= 1000 ? `${(space / 1000).toFixed(1)} GB` : `${space} MB`
  return value
}
