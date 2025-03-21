/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const generateId = (): string => {
  const timestamp = Date.now()
  const randomPart = Math.random().toString(36).slice(2, 11)
  return `${timestamp}${randomPart}`
}
