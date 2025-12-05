/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppFileSystemGuardOptions } from "app-utils/models"

export const mscHarmonyLocationDir = ["msc-harmony"]

export const getMscHarmonyLocation = (
  fileName?: string
): AppFileSystemGuardOptions => {
  return {
    scopeRelativePath: fileName
      ? [...mscHarmonyLocationDir, fileName]
      : mscHarmonyLocationDir,
    scope: "userData",
  }
}
