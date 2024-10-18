/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const stringToRegex = (value?: string) => {
  const main = value?.match(/\/(.+)\/.*/)?.[1]
  const options = value?.match(/\/.+\/(.*)/)?.[1]
  if (!main) {
    throw new Error("Invalid regex")
  }
  return new RegExp(main, options)
}
