/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReflectKey } from "App/core/constants"
import { FieldDefinition } from "App/core/types"

export const Field = (type = "") => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  return (target: any, propertyKey: string) => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!Reflect.hasMetadata(ReflectKey.Field, target.constructor)) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      Reflect.defineMetadata(ReflectKey.Field, [], target.constructor)
    }

    const fields = Reflect.getMetadata(
      ReflectKey.Field,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      target.constructor
    ) as FieldDefinition[]

    fields.push({
      type,
      propertyName: propertyKey,
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Reflect.defineMetadata(ReflectKey.Field, fields, target.constructor)
  }
}
