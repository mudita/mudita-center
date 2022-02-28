/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReflectKey } from "App/core/constants"
import { FieldDefinition } from "App/core/types"

export const Field = (type = "") => {
  return (target: any, propertyKey: string) => {
    if (!Reflect.hasMetadata(ReflectKey.Field, target.constructor)) {
      Reflect.defineMetadata(ReflectKey.Field, [], target.constructor)
    }

    const fields = Reflect.getMetadata(
      ReflectKey.Field,
      target.constructor
    ) as FieldDefinition[]

    fields.push({
      type,
      propertyName: propertyKey,
    })

    Reflect.defineMetadata(ReflectKey.Field, fields, target.constructor)
  }
}
