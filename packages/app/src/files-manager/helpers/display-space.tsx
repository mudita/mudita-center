/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const displaySpace = (megabyteSize: number): string => {
  const value =
    megabyteSize >= 1000
      ? `${(megabyteSize / 1000).toFixed(1)} GB`
      : `${megabyteSize} MB`
  return value
}
