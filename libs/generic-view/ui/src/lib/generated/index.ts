/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Feature,
  mcContactsView,
  mcContactsDuplicatesView,
  mcFileManagerView,
  mcImportContactsButton,
} from "generic-view/models"
import { generateMcContactsView } from "./mc-contacts-view/mc-contacts-view"
import { generateMcFileManagerView } from "./mc-file-manager/mc-file-manager-view"
import { generateFileManagerData } from "./mc-file-manager/mc-file-manager-data"
import { generateMcImportContactsButton } from "./mc-import-contacts-button"
import { View } from "generic-view/utils"
import { generateMcContactsDuplicatesView } from "./mc-contacts-view/mc-contacts-duplicates-view"

export * from "./mc-import-contacts-button"
export * from "./mc-contacts-view/mc-contacts-view"
export * from "./mc-contacts-view/mc-contacts-duplicates-view"
export * from "./mc-file-manager/mc-file-manager-view"

export const generatedViews = {
  [mcContactsView.key]: generateMcContactsView,
  [mcContactsDuplicatesView.key]: generateMcContactsDuplicatesView,
  [mcFileManagerView.key]: generateMcFileManagerView,
  [mcImportContactsButton.key]: generateMcImportContactsButton,
}

type generatedDataFn = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  config: View,
  feature: string
) => Feature["data"]

export const generatedData: Record<string, generatedDataFn> = {
  ["mc-file-manager-internal"]: generateFileManagerData,
  ["mc-file-manager-external"]: generateFileManagerData,
}
