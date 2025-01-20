/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Feature,
  mcContactsView,
  mcFileManagerView,
  mcImportContactsButton,
} from "generic-view/models"
import { generateMcContactsView } from "./mc-contacts-view/mc-contacts-view"
import { generateMcFileManagerView } from "./mc-file-manager/mc-file-manager-view"
import { generateFileManagerData } from "./mc-file-manager/mc-file-manager-data"
import { generateMcImportContactsButton } from "./mc-import-contacts-button"
import { View } from "generic-view/utils"

export * from "./mc-import-contacts-button"
export * from "./mc-contacts-view/mc-contacts-view"

export const generatedViews = {
  [mcContactsView.key]: generateMcContactsView,
  [mcFileManagerView.key]: generateMcFileManagerView,
  [mcImportContactsButton.key]: generateMcImportContactsButton,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type generatedDataFn = (data: any, config: View) => Feature["data"]

export const generatedData: Record<string, generatedDataFn> = {
  ["fileManager"]: generateFileManagerData,
}
