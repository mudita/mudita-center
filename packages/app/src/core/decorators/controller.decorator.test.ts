/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReflectKey } from "App/core/constants"
import { Controller } from "./controller.decorator"
import { IpcEvent } from "./ipc-event.decorator"

@Controller("fake-controller-without-events")
class FakeControllerWithOutEvents {}

@Controller("fake-controller-with-events")
class FakeControllerWithEvents {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  @IpcEvent("first-event")
  public async firstEvent(): Promise<void> {
    console.log("first event")
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  @IpcEvent("second-event")
  public async secondEvent(): Promise<void> {
    console.log("second event")
  }
}

const fakeControllerWithOutEvents = new FakeControllerWithOutEvents()
const firstFakeControllerWithEvents = new FakeControllerWithEvents()
const secondFakeControllerWithEvents = new FakeControllerWithEvents()

describe("Event: exists", () => {
  test("register controller metadata", () => {
    expect(
      Reflect.getMetadata(
        ReflectKey.Prefix,
        firstFakeControllerWithEvents.constructor
      )
    ).toEqual("fake-controller-with-events")
    expect(
      Reflect.getMetadata(
        ReflectKey.Event,
        firstFakeControllerWithEvents.constructor
      )
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

  test("registered twice controller doesn't duplicated `event` keys", () => {
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      Reflect.getMetadata(
        ReflectKey.Event,
        firstFakeControllerWithEvents.constructor
      ).length
    ).toEqual(2)
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      Reflect.getMetadata(
        ReflectKey.Event,
        secondFakeControllerWithEvents.constructor
      ).length
    ).toEqual(2)
  })
})

describe("Event: doesn't exists", () => {
  test("returns the empty list of events", () => {
    expect(
      Reflect.getMetadata(
        ReflectKey.Prefix,
        fakeControllerWithOutEvents.constructor
      )
    ).toEqual("fake-controller-without-events")
    expect(
      Reflect.getMetadata(
        ReflectKey.Event,
        fakeControllerWithOutEvents.constructor
      )
    ).toEqual([])
  })
})
