/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReflectKey } from "App/core/constants"

export const Controller = (prefix = ""): ClassDecorator => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any) => {
    Reflect.defineMetadata(ReflectKey.Prefix, prefix, target)

    if (!Reflect.hasMetadata(ReflectKey.Event, target)) {
      Reflect.defineMetadata(ReflectKey.Event, [], target)
    }
  }
}
