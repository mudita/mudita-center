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
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const prefix = Reflect.getMetadata(
        ReflectKey.Prefix,
        controller.constructor
      )
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const events: EventDefinition[] = Reflect.getMetadata(
        ReflectKey.Event,
        controller.constructor
      )

      events.forEach((event) => {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/require-await
        ipcMain.answerRenderer(`${prefix}-${event.name}`, async (data) => {
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
          return (controller as Record<string, any>)[event.methodName](data)
        })
      })
    })
  }
}
