/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IndexStorageService } from "App/index-storage/services"
import { ReflectKey } from "App/core/constants"
import { FieldDefinition, Model } from "App/core/types"

export class DataIndexInitializer {
  constructor(private index: IndexStorageService) {}

  public initialize(models: Model[]): void {
    models.forEach((model) => {
      const prefix = Reflect.getMetadata(ReflectKey.Model, model.constructor)
      const fields: FieldDefinition[] = Reflect.getMetadata(
        ReflectKey.Field,
        model.constructor
      )
      this.index.createIndex(prefix, fields)
    })
  }
}
