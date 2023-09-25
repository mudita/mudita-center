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
import { crashDumpReducer } from "App/crash-dump/reducers"
import RootWrapper from "App/__deprecated__/renderer/wrappers/root-wrapper"
import networkStatus from "App/__deprecated__/renderer/models/network-status/network-status"
import history from "App/__deprecated__/renderer/routes/history"
import { Store, ReduxRootState } from "App/__deprecated__/renderer/store"
import { backupReducer } from "App/backup/reducers/backup.reducer"
import { modalsManagerReducer } from "App/modals-manager/reducers"
import { settingsReducer } from "App/settings/reducers"
import { checkUpdateAvailable } from "App/settings/actions/check-update-available.action"
import { updateOsReducer } from "App/update/reducers"
import { dataSyncReducer } from "App/data-sync/reducers"

jest.mock("App/settings/actions/check-update-available.action")

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn,
      append: jest.fn,
    }),
    MenuItem: () => jest.fn(),
    getCurrentWindow: jest.fn(),
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

jest.mock("App/__deprecated__/renderer/requests/connect-device.request", () =>
  jest.fn().mockReturnValue({
    status: "ok",
  })
)

jest.mock("App/settings/requests", () => ({
  getConfiguration: jest.fn().mockReturnValue({
    centerVersion: "1.0.0",
    productVersions: {
      MuditaHarmony: "1.0.0",
      MuditaPure: "1.0.0",
    },
  }),
}))

jest.mock("App/settings/requests/get-settings.request.ts", () => ({
  getAppSettings: jest.fn().mockReturnValue({
    autostart: false,
    tethering: false,
    incomingCalls: false,
    incomingMessages: false,
    lowBattery: false,
    osUpdates: false,
    nonStandardAudioFilesConversion: false,
    convert: "Convert automatically",
    conversionFormat: "WAV",
    tray: true,
    osBackupLocation: `fake/path/pure/phone/backups/`,
    osDownloadLocation: `fake/path/pure/os/downloads/`,
    language: "en-US",
    neverConnected: true,
    collectingData: undefined,
    diagnosticSentTimestamp: 0,
  }),
}))

jest.mock("App/__deprecated__/renderer/requests/check-app-update.request")

type Props = ComponentProps<typeof RootWrapper>

const defaultProps: Props = {
  history,
}

const store = init({
  models: { networkStatus },
  redux: {
    middlewares: [thunk],
    reducers: {
      device: deviceReducer,
      backup: backupReducer,
      crashDump: crashDumpReducer,
      modalsManager: modalsManagerReducer,
      settings: settingsReducer,
      update: updateOsReducer,
      dataSync: dataSyncReducer,
    },
  },
}) as Store

const render = (extraProps?: Partial<Props>) => {
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
    expect(checkUpdateAvailable).not.toHaveBeenCalled()
  })
})

test("appUpdateAvailable is to false when online is set to false", async () => {
  const online = jest.spyOn(window.navigator, "onLine", "get")
  online.mockReturnValue(false)

  const { store } = render()

  await waitFor(() => {
    expect(
      (store.getState() as unknown as ReduxRootState).settings.updateAvailable
    ).toBeFalsy()
  })
})
