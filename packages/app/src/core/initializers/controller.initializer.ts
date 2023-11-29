/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { ReflectKey } from "App/core/constants"
import { EventDefinition, Controller } from "App/core/types"
import { APIModule } from "App/api-main/api-module"

export class ControllerInitializer {
  public initialize(controllers: Controller[]): void {
    controllers.forEach(this.initializeSingleObject)
    // controllers.forEach((controller) => {
    //   // AUTO DISABLED - fix me if you like :)
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   const events: EventDefinition[] = Reflect.getMetadata(
    //     ReflectKey.Event,
    //     controller.constructor
    //   )

    //   events.forEach((event) => {
    //     // AUTO DISABLED - fix me if you like :)
    //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/require-await
    //     ipcMain.answerRenderer(event.name, (data) => {
    //       // AUTO DISABLED - fix me if you like :)
    //       // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    //       return (controller as Record<string, any>)[event.methodName](data)
    //     })
    //   })
    // })
  }

  public initializeSingleObject(controller: object) {
    const events: EventDefinition[] = Reflect.getMetadata(
      ReflectKey.Event,
      controller.constructor
    )

    console.log(events)

    events.forEach((event) => {
      console.log(event.name)
      if (event.name == "api-config") {
        console.log("no elo")
        console.log((controller as Record<string, any>)[event.methodName]())
      }
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/require-await
      ipcMain.answerRenderer(event.name, (data) => {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
        return (controller as Record<string, any>)[event.methodName](data)
      })
    })
  }
}
