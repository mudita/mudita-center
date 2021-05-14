/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const isPrerelease = (tagName: string): boolean => {
  return tagName.replace(/(release-[\d]*\.[\d]*\.[\d]*)/i, "") !== ""
}
