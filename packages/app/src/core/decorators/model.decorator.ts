/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReflectKey } from "App/core/constants"

export const Model = (name = ""): any => {
  return (target: any) => {
    Reflect.defineMetadata(ReflectKey.Model, name, target)

    if (!Reflect.hasMetadata(ReflectKey.Field, target)) {
      Reflect.defineMetadata(ReflectKey.Field, [], target)
    }

    return class extends target {
      _modelName = name
    }
  }
}
