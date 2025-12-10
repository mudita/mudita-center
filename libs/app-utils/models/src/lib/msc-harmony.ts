/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AppFileSystemGuardOptions,
  AppFileSystemScope,
} from "./app-file-system"

export const MSC_HARMONY_SCOPE: AppFileSystemScope = "userData" as const
export const MSC_HARMONY_SCOPE_CATALOG_DIR = "msc-harmony" as const

export const getMscHarmonyLocation = (
  fileName?: string
): AppFileSystemGuardOptions => {
  return {
    scopeRelativePath: fileName
      ? [MSC_HARMONY_SCOPE_CATALOG_DIR, fileName]
      : MSC_HARMONY_SCOPE_CATALOG_DIR,
    scope: MSC_HARMONY_SCOPE,
  }
}
