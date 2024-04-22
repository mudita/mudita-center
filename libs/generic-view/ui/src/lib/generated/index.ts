/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mcImportContactsButton } from "generic-view/models"
import { generateMcImportContactsButton } from "./mc-import-contacts-button"

export * from "./mc-import-contacts-button"

export const generated = {
  [mcImportContactsButton.key]: generateMcImportContactsButton,
}
