/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { contactsDuplicatesView } from "./contacts-duplicates-view"
import { contactsView } from "./contacts-view"
import { fileManagerView } from "./file-manager-view"
import { mcDataMigrationView } from "./mc-data-migration-view"

export default {
  contacts: contactsView,
  contactsDuplicates: contactsDuplicatesView,
  fileManager: fileManagerView,
  ["mc-data-migration"]: mcDataMigrationView,
}
