/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { init } from "@rematch/core"
import devMode from "App/dev-mode/store/dev-mode"
import appContextMenu from "Renderer/wrappers/app-context-menu"
import registerAppContextMenu from "./register-app-context-menu"
import ContextMenu from "App/context-menu/context-menu"

const storeMock = init({
  models: {
    devMode,
  },
})

jest.mock("electron", () => ({
  remote: {
    app: {
      getPath: () => "/mocked/path",
    },
  },
}))

jest.mock(
  "Renderer/store",
  jest.fn().mockReturnValueOnce({
    getState: () => storeMock.getState(),
  })
)
jest.mock("App/context-menu/context-menu")

test("calls ContextMenu registerItems method with proper attributes", () => {
  registerAppContextMenu(appContextMenu)

  expect(
    (ContextMenu as jest.Mock).mock.instances[0].registerItems.mock.calls[0][0]
  ).toEqual("Device")
  expect(
    (ContextMenu as jest.Mock).mock.instances[0].registerItems.mock.calls[1][0]
  ).toEqual("Messages")
  expect(
    (ContextMenu as jest.Mock).mock.instances[0].registerItems.mock.calls[2][0]
  ).toEqual("Contacts")
  expect(
    (ContextMenu as jest.Mock).mock.instances[0].registerItems.mock.calls[3][0]
  ).toEqual("Calendar")
})
