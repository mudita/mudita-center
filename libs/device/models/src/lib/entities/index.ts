/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntitiesDeletePartialSuccess } from "./entities-delete.validator"

export * from "./entities-config.validator"
export * from "./entity-data-get.validator"
export * from "./entities-metadata.validator"
export * from "./entities-data-get.validator"
export * from "./entities-delete.validator"
export * from "./entity-data.validator"
export * from "./entity-data-post.validator"
export * from "./entity-data-patch.validator"

export type EntityId = string
export type EntitiesDeleteResponse = EntitiesDeletePartialSuccess | undefined
