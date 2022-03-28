/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { ReflectKey } from "App/core/constants"
import { EventDefinition, Controller } from "App/core/types"

export class ControllerInitializer {
  public initialize(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      const prefix = Reflect.getMetadata(
        ReflectKey.Prefix,
        controller.constructor
      )
      const events: EventDefinition[] = Reflect.getMetadata(
        ReflectKey.Event,
        controller.constructor
      )

      events.forEach((event) => {
        ipcMain.answerRenderer(`${prefix}-${event.name}`, async (data) => {
          return (controller as Record<string, any>)[event.methodName](data)
        })
      })
    })
  }
}
