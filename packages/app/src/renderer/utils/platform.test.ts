/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Platform } from "Renderer/utils/platform"

const currentPlatform = process.platform

describe("Platform: `darwin`", () => {
  beforeAll(() => {
    Object.defineProperty(process, "platform", {
      value: "darwin",
    })
  })

  afterAll(() => {
    Object.defineProperty(process, "platform", {
      value: currentPlatform,
    })
  })

  test("returns True for macOs() method", () => {
    expect(new Platform().macOs()).toBeTruthy()
    expect(new Platform().linux()).toBeFalsy()
    expect(new Platform().windows()).toBeFalsy()
  })
})

describe("Platform: `linux`", () => {
  beforeAll(() => {
    Object.defineProperty(process, "platform", {
      value: "linux",
    })
  })

  afterAll(() => {
    Object.defineProperty(process, "platform", {
      value: currentPlatform,
    })
  })

  test("returns True for linux() method", () => {
    expect(new Platform().linux()).toBeTruthy()
    expect(new Platform().macOs()).toBeFalsy()
    expect(new Platform().windows()).toBeFalsy()
  })
})

describe("Platform: `win32`", () => {
  beforeAll(() => {
    Object.defineProperty(process, "platform", {
      value: "win32",
    })
  })

  afterAll(() => {
    Object.defineProperty(process, "platform", {
      value: currentPlatform,
    })
  })

  test("returns True for windows() method", () => {
    expect(new Platform().windows()).toBeTruthy()
    expect(new Platform().macOs()).toBeFalsy()
    expect(new Platform().linux()).toBeFalsy()
  })
})
