/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReflectKey } from "App/core/constants"
import { Controller } from "./controller.decorator"
import { IpcEvent } from "./ipc-event.decorator"

@Controller("fake-controller-with-events")
class FakeControllerWithEvents {
  @IpcEvent("first-event")
  public async firstEvent(): Promise<void> {
    console.log("first event")
  }

  @IpcEvent("second-event")
  public async secondEvent(): Promise<void> {
    console.log("second event")
  }

  @IpcEvent("second-event")
  public async duplicatedEvent(): Promise<void> {
    console.log("second event")
  }
}

const fakeControllerWithEvents = new FakeControllerWithEvents()

test("register events metadata", () => {
  expect(
    Reflect.getMetadata(ReflectKey.Event, fakeControllerWithEvents.constructor)
  ).toEqual([
    {
      controller: "FakeControllerWithEvents",
      methodName: "firstEvent",
      name: "first-event",
    },
    {
      controller: "FakeControllerWithEvents",
      methodName: "secondEvent",
      name: "second-event",
    },
  ])
})
