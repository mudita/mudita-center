/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppFileSystem } from "app-utils/renderer"
import { getMscHarmonyLocation } from "../msc-harmony"

export const clearDownloadedFiles = async (): Promise<void> => {
  try {
    await AppFileSystem.rm({
      ...getMscHarmonyLocation(),
      options: { recursive: true, force: true },
    })
  } catch {
    //
  }
}
