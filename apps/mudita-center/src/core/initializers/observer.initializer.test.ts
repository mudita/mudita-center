/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ObserverInitializer } from "./observer.initializer"
import { Observer } from "App/core/types"

const observer = jest.fn()
class FakeObserver implements Observer {
  public observe(): void {
    observer()
  }
}

const fakeObserver = new FakeObserver()
const subject = new ObserverInitializer()

describe("Method: initialize", () => {
  test("calls `observe` method of observers", () => {
    expect(observer).toHaveBeenCalledTimes(0)
    subject.initialize([fakeObserver])
    expect(observer).toHaveBeenCalledTimes(1)
  })
})
