/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ReflectKey } from "App/core/constants"
import { ControllerInitializer } from "./controller.initializer"

@Controller("fake-controller")
class FakeController {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  @IpcEvent("event")
  public async fakeEventHandler(): Promise<string> {
    return "hello world"
  }
}

const fakeInstance = new FakeController()
const subject = new ControllerInitializer()

describe("Method: initialize", () => {
  test("registers controller metadata", () => {
    subject.initialize([fakeInstance])
    expect(
      Reflect.getMetadata(ReflectKey.Prefix, fakeInstance.constructor)
    ).toEqual("fake-controller")
    expect(
      Reflect.getMetadata(ReflectKey.Event, fakeInstance.constructor)
    ).toEqual([
      {
        controller: "FakeController",
        methodName: "fakeEventHandler",
        name: "event",
      },
    ])
  })
})
