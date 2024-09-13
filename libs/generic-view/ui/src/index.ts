/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { blocks } from "./lib/blocks/blocks"
import { rows } from "./lib/data-rows/data-rows"
import { predefinedComponents } from "./lib/predefined/predefined"
import { helpers } from "./lib/helpers/helpers"
import { interactive } from "./lib/interactive/interactive"
import { buttons } from "./lib/buttons/buttons"
import { texts } from "./lib/texts"
import { Icon } from "./lib/icon/icon"

export * from "./lib/icon/icon"
export * from "./lib/api-connection-demo"
export * from "./lib/interactive/modal"
export * from "./lib/interactive/modal/modal-base"
export * from "./lib/interactive/form/input/search-input"
export * from "./lib/interactive/form/form"
export * from "./lib/shared/shared"
export * from "./lib/predefined/backup/backup-error"
export * from "./lib/predefined/backup-restore/backup-restore-error"
export * from "./lib/predefined/import-contacts/import-contacts-error"
export * from "./lib/predefined/data-migration/components/transfer-error-modal"
export { DataMigrationPage } from "./lib/predefined/data-migration/data-migration"
export { RecoveryModePage } from "../../../msc-flash/msc-flash-harmony/src/lib/ui/recovery-mode"
export * from "./lib/buttons/button-text"
export * from "./lib/buttons/button-primary"
export * from "./lib/texts/paragraphs"
export * from "./lib/texts/headers"

const apiComponents = {
  ...predefinedComponents,
  ...blocks,
  ...rows,
  ...helpers,
  ...interactive,
  ...buttons,
  ...texts,
  icon: Icon,
}

export default apiComponents
