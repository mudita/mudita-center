/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppFileSystemGuardOptions } from "app-utils/models"
import { MSC_HARMONY_SCOPE, MSC_HARMONY_SCOPE_CATALOG_DIR } from "devices/harmony-msc/models"

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
