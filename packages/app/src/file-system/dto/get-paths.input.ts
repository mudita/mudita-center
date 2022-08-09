/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FileFilter, OpenDialogOptions } from "electron"

export interface GetPathInput {
  filters: FileFilter[]
  properties: OpenDialogOptions["properties"]
}
