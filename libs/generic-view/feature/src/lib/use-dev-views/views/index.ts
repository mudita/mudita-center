/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { contactsView } from "./contacts-view"
import { fileManagerView } from "./file-manager-view"
import { mcDataMigrationView } from "./mc-data-migration-view"

export default {
  contacts: contactsView,
  fileManager: fileManagerView,
  ["mc-data-migration"]: mcDataMigrationView,
}
