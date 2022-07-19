/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { init } from "@rematch/core"
import devMode from "App/__deprecated__/dev-mode/store/dev-mode"
import appContextMenu from "App/__deprecated__/renderer/wrappers/app-context-menu"
import registerAppContextMenu from "./register-app-context-menu"
import ContextMenu from "App/__deprecated__/context-menu/context-menu"

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
  "App/__deprecated__/renderer/store",
  jest.fn().mockReturnValueOnce({
    getState: () => storeMock.getState(),
  })
)
jest.mock("App/__deprecated__/context-menu/context-menu")

test("calls ContextMenu registerItems method with proper attributes", () => {
  registerAppContextMenu(appContextMenu)

  expect(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (ContextMenu as jest.Mock).mock.instances[0].registerItems.mock.calls[0][0]
  ).toEqual("Device")
  expect(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (ContextMenu as jest.Mock).mock.instances[0].registerItems.mock.calls[1][0]
  ).toEqual("Messages")
  expect(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (ContextMenu as jest.Mock).mock.instances[0].registerItems.mock.calls[2][0]
  ).toEqual("Contacts")
  expect(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (ContextMenu as jest.Mock).mock.instances[0].registerItems.mock.calls[3][0]
  ).toEqual("Calendar")
})
