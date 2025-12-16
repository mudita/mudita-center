/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Platform } from "app-utils/models"

const detectPlatform = (): Platform | "unknown" => {
  // Electron / Node
  if (typeof process !== "undefined" && process.platform) {
    if (process.platform === "win32") return Platform.windows
    if (process.platform === "darwin") return Platform.macos
    if (process.platform === "linux") return Platform.linux
    return "unknown"
  }

  // Renderer / Browser
  if (navigator !== undefined) {
    const userAgent = navigator.userAgent
    if (/Win/i.test(userAgent)) return Platform.windows
    if (/Mac/i.test(userAgent)) return Platform.macos
    if (/Linux/i.test(userAgent)) return Platform.linux
  }

  return "unknown"
}
export const platform = detectPlatform()
