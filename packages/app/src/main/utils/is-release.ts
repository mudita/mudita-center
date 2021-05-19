/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const isRelease = (tagName: string): boolean => {
  return /^release-(\d+\.){2}\d+$/i.test(tagName)
}
