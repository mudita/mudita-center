/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const isRelease = (version: string): boolean => {
  return /(\d+\.){2}\d+$/i.test(version)
}
