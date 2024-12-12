/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { blocks } from "./lib/blocks/blocks"
import { rows } from "./lib/data-rows/data-rows"
import { predefinedComponents } from "./lib/predefined/predefined"
import { helpers } from "./lib/helpers/helpers"
import { interactive } from "./lib/interactive/interactive"
import { labels } from "./lib/labels"
import { list } from "./lib/list"
import { buttons } from "./lib/buttons/buttons"
import { texts } from "./lib/texts"
import { Icon } from "./lib/icon/icon"
import { table } from "./lib/table"
import { entities } from "./lib/entities"

export * from "./lib/icon/icon"
export * from "./lib/api-connection-demo"
export * from "./lib/interactive/form/form"
export * from "./lib/interactive/form/input/search-input"
export * from "./lib/interactive/modal"
export * from "./lib/interactive/modal/modal-base"
export * from "./lib/interactive/tooltip/tooltip"
export * from "./lib/shared/shared"
export * from "./lib/labels"
export * from "./lib/list"
export * from "./lib/predefined/backup/backup-error"
export * from "./lib/predefined/backup-restore/backup-restore-error"
export * from "./lib/predefined/import-contacts/import-contacts-error"
export * from "./lib/predefined/data-migration/components/transfer-error-modal"
export { DataMigrationPage } from "./lib/predefined/data-migration/data-migration"
export * from "./lib/buttons/button-text"
export * from "./lib/buttons/button-primary"
export * from "./lib/texts/paragraphs"
export * from "./lib/texts/headers"
export * from "./lib/texts/highlight-text"
export * from "./lib/entities"

const apiComponents = {
  ...predefinedComponents,
  ...blocks,
  ...rows,
  ...helpers,
  ...interactive,
  ...labels,
  ...list,
  ...buttons,
  ...texts,
  ...table,
  ...entities,
  icon: Icon,
}

export default apiComponents
