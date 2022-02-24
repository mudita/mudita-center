/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReflectKey } from "App/core/constants"
import { EventDefinition } from "App/core/types"

export const IpcEvent = (event: string) => {
  return (target: any, propertyKey: string) => {
    if (!Reflect.hasMetadata(ReflectKey.Event, target.constructor)) {
      Reflect.defineMetadata(ReflectKey.Event, [], target.constructor)
    }

    const events = Reflect.getMetadata(
      ReflectKey.Event,
      target.constructor
    ) as EventDefinition[]
    const controllerEvents = events.filter(
      (eventDefinition) =>
        eventDefinition.controller === target.constructor.name
    )
    const eventWithSameName = controllerEvents.find(
      (eventDefinition) => eventDefinition.name === event
    )

    if (!eventWithSameName) {
      events.push({
        name: event,
        methodName: propertyKey,
        controller: target.constructor.name,
      })
    }

    Reflect.defineMetadata(ReflectKey.Event, events, target.constructor)
  }
}
