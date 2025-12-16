/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const sliceSegments = (
  path: string,
  start?: number,
  end?: number
): string => {
  const isWindowsPath = path.includes("\\")
  const isAbsolutePosix = !isWindowsPath && path.startsWith("/") && start === 0

  const normalizedPath = path.replace(/\\/g, "/")
  const segments = normalizedPath
    .split("/")
    .filter((segment) => segment.length > 0)
  const resultSegments = segments.slice(start, end)
  const separator = isWindowsPath ? "\\" : "/"

  if (isWindowsPath && /^[A-Za-z]:$/.test(segments[0])) {
    return (
      resultSegments[0] + separator + resultSegments.slice(1).join(separator)
    )
  }

  let result = resultSegments.join(separator)

  if (isAbsolutePosix) {
    result = separator + result
  }

  return result
}
