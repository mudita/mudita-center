/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  mcContactsView,
  mcFileManagerView,
  mcImportContactsButton,
} from "generic-view/models"
import { generateMcContactsView } from "./mc-contacts-view"
import { generateMcFileManagerView } from "./mc-file-manager-view/mc-file-manager-view"
import { generateMcImportContactsButton } from "./mc-import-contacts-button"

export * from "./mc-import-contacts-button"
export * from "./mc-contacts-view"

export const generated = {
  [mcContactsView.key]: generateMcContactsView,
  [mcFileManagerView.key]: generateMcFileManagerView,
  [mcImportContactsButton.key]: generateMcImportContactsButton,
}
