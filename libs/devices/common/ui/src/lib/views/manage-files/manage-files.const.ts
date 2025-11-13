/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { platform } from "app-utils/common"

const WindowsInterferingApps: string[] = [
  "Slack",
  "Google Chrome",
  "Google Drive",
  "Dropbox",
  "OneDrive",
  "WhatsApp",
  "Lightroom",
]

const MacInterferingApps: string[] = [
  "Android File Transfer",
  "Google Chrome",
  "Google Drive",
  "PhotoSync",
  "Preview",
  "Dropbox",
  "Photos",
  "Image Capture",
  "OneDrive",
  "WhatsApp",
  "Slack",
  "Lightroom",
]

export const interferingApps =
  platform === "macos" ? MacInterferingApps : WindowsInterferingApps
