/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntitiesConfig, EntityData } from "device/models"
import { computeField } from "./compute-field"

export const enhanceEntity = (
  entity: EntityData,
  config: Partial<EntitiesConfig>
) => {
  const enhancedEntity = { ...entity }
  if (config.computedFields) {
    for (const [fieldKey, fieldConfig] of Object.entries(
      config.computedFields
    )) {
      enhancedEntity[fieldKey] = computeField(enhancedEntity, fieldConfig)
    }
  }
  return enhancedEntity
}
