/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type Platform = "windows" | "macos" | "linux" | "unknown"

const detectPlatform = (): Platform => {
  const userAgent = navigator.userAgent

  if (/Win/i.test(userAgent)) return "windows"
  if (/Mac/i.test(userAgent)) return "macos"
  if (/Linux/i.test(userAgent)) return "linux"

  return "unknown"
}

export const platform = detectPlatform()
