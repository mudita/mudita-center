/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { init } from "@rematch/core"
import { render as testingLibraryRender } from "@testing-library/react"
import RootWrapper from "Renderer/wrappers/root-wrapper"
import settings from "Renderer/models/settings/settings"
import history from "Renderer/routes/history"
import { Store } from "Renderer/store"
import basicInfo from "Renderer/models/basic-info/basic-info"
import checkAppUpdateRequest from "Renderer/requests/check-app-update.request"

jest.mock("Renderer/register-hotkeys", jest.fn)
jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn,
      append: jest.fn,
    }),
    MenuItem: () => jest.fn(),
    app: {
      getPath: () => "",
    },
  },
  app: {
    getPath: () => "",
  },
}))
jest.mock(
  "electron-better-ipc",
  () => {
    const mockIpcRenderer = {
      callMain: jest.fn(),
      answerMain: () => jest.fn(),
      on: jest.fn(),
      removeListener: jest.fn(),
    }
    return { ipcRenderer: mockIpcRenderer }
  },
  { virtual: true }
)
jest.mock("Renderer/requests/check-app-update.request")

type Props = ComponentProps<typeof RootWrapper>

const store = init({
  models: { settings, basicInfo },
}) as Store

const defaultProps: Props = {
  store,
  history,
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return testingLibraryRender(<RootWrapper {...props} />)
}

test("checkAppUpdateRequest isn't call when online is set to false ", () => {
  const online = jest.spyOn(window.navigator, "onLine", "get")
  online.mockReturnValue(false)

  render()
  expect(checkAppUpdateRequest).not.toHaveBeenCalled()
})

test("appUpdateAvailable is to false when online is set to false", () => {
  const online = jest.spyOn(window.navigator, "onLine", "get")
  online.mockReturnValue(false)

  render()
  expect(store.getState().settings.appUpdateAvailable).toBeFalsy()
})

test("appUpdateStepModalDisplayed is to false when online is set to false", () => {
  const online = jest.spyOn(window.navigator, "onLine", "get")
  online.mockReturnValue(false)

  render()
  expect(store.getState().settings.appUpdateStepModalDisplayed).toBeTruthy()
})
