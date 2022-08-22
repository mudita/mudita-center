/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReflectKey } from "App/core/constants"
import { EventDefinition } from "App/core/types"

export const IpcEvent = (event: string) => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  return (target: any, propertyKey: string) => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!Reflect.hasMetadata(ReflectKey.Event, target.constructor)) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      Reflect.defineMetadata(ReflectKey.Event, [], target.constructor)
    }

    const events = Reflect.getMetadata(
      ReflectKey.Event,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      target.constructor
    ) as EventDefinition[]
    const controllerEvents = events.filter(
      (eventDefinition) =>
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        eventDefinition.controller === target.constructor.name
    )
    const eventWithSameName = controllerEvents.find(
      (eventDefinition) => eventDefinition.name === event
    )

    if (!eventWithSameName) {
      events.push({
        name: event,
        methodName: propertyKey,
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        controller: target.constructor.name,
      })
    }

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Reflect.defineMetadata(ReflectKey.Event, events, target.constructor)
  }
}
