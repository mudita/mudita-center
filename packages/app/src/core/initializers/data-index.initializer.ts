/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import elasticlunr from "elasticlunr"
import { IndexStorage } from "App/index-storage/types"
import { ReflectKey } from "App/core/constants"
import { FieldDefinition, Model } from "App/core/types"

export class DataIndexInitializer {
  constructor(private index: IndexStorage) {}

  public initialize(models: Model[]): void {
    models.forEach((model) => {
      const prefix = Reflect.getMetadata(ReflectKey.Model, model.constructor)
      const fields: FieldDefinition[] = Reflect.getMetadata(
        ReflectKey.Field,
        model.constructor
      )

      const index = elasticlunr<any>()

      fields.forEach((field) => {
        if (field.type === "ref") {
          index.setRef(field.propertyName)
        } else {
          index.addField(field.propertyName)
        }
      })

      this.index.set(prefix, index)
    })
  }
}
