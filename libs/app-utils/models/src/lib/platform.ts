/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum Platform {
  windows = "windows",
  macos = "macos",
  linux = "linux",
}

const detectPlatform = (): Platform | "unknown" => {
  const userAgent = navigator.userAgent

  if (/Win/i.test(userAgent)) return Platform.windows
  if (/Mac/i.test(userAgent)) return Platform.macos
  if (/Linux/i.test(userAgent)) return Platform.linux

  return "unknown"
}

export const platform = detectPlatform()
