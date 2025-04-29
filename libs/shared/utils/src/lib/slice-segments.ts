/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const sliceSegments = (
  path: string,
  start?: number,
  end?: number
): string => {
  const segments = path.split("/").filter((segment) => segment.length > 0)
  const resultSegments = segments.slice(start, end)
  return resultSegments.join("/")
}
