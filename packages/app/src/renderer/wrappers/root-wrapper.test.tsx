/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { init } from "@rematch/core"
import { render as testingLibraryRender, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { deviceReducer } from "App/device"
import RootWrapper from "Renderer/wrappers/root-wrapper"
import settings from "Renderer/models/settings/settings"
import networkStatus from "Renderer/models/network-status/network-status"
import history from "Renderer/routes/history"
import { Store } from "Renderer/store"
import { restoreDeviceReducer } from "App/restore-device/reducers/restore-device.reducer"
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

jest.mock("Renderer/requests/connect-device.request", () =>
  jest.fn().mockReturnValue({
    status: "ok",
  })
)

jest.mock("App/renderer/requests/get-application-configuration.request", () =>
  jest.fn().mockReturnValue({
    centerVersion: "20.1.0",
    osVersion: "76.0.1",
  })
)

jest.mock("Renderer/requests/app-settings.request", () => ({
  getAppSettings: jest.fn().mockReturnValue({
    appAutostart: false,
    appTethering: false,
    appIncomingCalls: false,
    appIncomingMessages: false,
    appLowBattery: false,
    appOsUpdates: false,
    appNonStandardAudioFilesConversion: false,
    appConvert: "Convert automatically",
    appConversionFormat: "WAV",
    appTray: true,
    pureOsBackupLocation: `fake/path/pure/phone/backups/`,
    pureOsDownloadLocation: `fake/path/pure/os/downloads/`,
    language: "en-US",
    pureNeverConnected: true,
    appCollectingData: undefined,
    diagnosticSentTimestamp: 0,
  }),
}))

jest.mock("Renderer/requests/check-app-update.request")

type Props = ComponentProps<typeof RootWrapper>

const defaultProps: Props = {
  history,
}

const render = (extraProps?: Partial<Props>) => {
  const store = init({
    models: { settings, networkStatus },
    redux: {
      middlewares: [thunk],
      reducers: {
        device: deviceReducer,
        restoreDevice: restoreDeviceReducer,
      },
    },
  }) as Store

  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return {
    ...testingLibraryRender(
      <Provider store={store}>
        <RootWrapper {...props} />
      </Provider>
    ),
    store,
  }
}

test("checkAppUpdateRequest isn't call when online is set to false ", async () => {
  const online = jest.spyOn(window.navigator, "onLine", "get")
  online.mockReturnValue(false)

  render()

  await waitFor(() => {
    expect(checkAppUpdateRequest).not.toHaveBeenCalled()
  })
})

test("appUpdateAvailable is to false when online is set to false", async () => {
  const online = jest.spyOn(window.navigator, "onLine", "get")
  online.mockReturnValue(false)

  const { store } = render()

  await waitFor(() => {
    expect(store.getState().settings.appUpdateAvailable).toBeFalsy()
  })
})

test("appUpdateStepModalDisplayed is to false when online is set to false", async () => {
  const online = jest.spyOn(window.navigator, "onLine", "get")
  online.mockReturnValue(false)

  const { store } = render()

  await waitFor(async () => {
    expect(store.getState().settings.appUpdateStepModalDisplayed).toBeTruthy()
  })
})
