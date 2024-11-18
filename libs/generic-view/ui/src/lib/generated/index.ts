/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mcImportContactsButton, mcContactsView } from "generic-view/models"
import { generateMcImportContactsButton } from "./mc-import-contacts-button"
import { generateMcContactsView } from "./mc-contacts-view"

export * from "./mc-import-contacts-button"
export * from "./mc-contacts-view"

export const generated = {
  [mcImportContactsButton.key]: generateMcImportContactsButton,
  [mcContactsView.key]: generateMcContactsView,
} as const
