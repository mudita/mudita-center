/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataProviderConfig, EntitiesArrayConfig } from "device/models"

type Options = NonNullable<EntitiesArrayConfig["fields"]>[number]

export const fileCounterDataProvider = (
  entitiesType: string,
  storagePath: string,
  options: Options = { componentField: "data.fields.totalEntities" }
): {
  dataProvider: DataProviderConfig
} => {
  return {
    dataProvider: {
      source: "entities-array",
      entitiesType,
      filters: [
        {
          field: "filePath",
          patterns: [`/^${storagePath}/m`],
        },
      ],
      fields: [
        {
          modifier: "length",
          ...options,
        },
      ],
    },
  }
}
