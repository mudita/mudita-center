/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import getApplicationConfiguration from "App/__deprecated__/renderer/requests/get-application-configuration.request"
import { getSettings } from "App/settings/requests"
import { SettingsEvent } from "App/settings/constants"
import { loadSettings } from "./load-settings.action"

jest.mock("App/settings/requests", () => ({
  getSettings: jest.fn().mockReturnValue({ collectingData: false }),
}))

jest.mock(
  "App/__deprecated__/renderer/requests/get-application-configuration.request",
  () =>
    jest.fn().mockReturnValue({
      centerVersion: "1.0.0",
      osVersion: "1.0.0",
    })
)

jest.mock("App/backup/actions/load-backup-data.action", () => ({
  loadBackupData: () => jest.fn(),
}))

jest.mock("App/modals-manager/actions", () => ({
  checkAppForcedUpdateFlowToShow: () => jest.fn(),
  checkCollectingDataModalToShow: () => jest.fn(),
  checkAppUpdateFlowToShow: () => jest.fn(),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

const mockStore = createMockStore([thunk])({
  settings: {
    osBackupLocation: "/test/path",
  },
})

test("`loadSettings` action dispatch SettingsEvent.LoadSettings event and calls loadSettings", async () => {
  expect(getSettings).not.toHaveBeenCalled()
  expect(getApplicationConfiguration).not.toHaveBeenCalled()

  const {
    meta: { requestId },
  } = await mockStore.dispatch(loadSettings() as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([
    loadSettings.pending(requestId),
    {
      type: SettingsEvent.SetSettings,
      payload: {
        collectingData: false,
        currentVersion: "1.4.1",
        lowestSupportedVersions: {
          lowestSupportedCenterVersion: "1.0.0",
          lowestSupportedProductVersion: {
            MuditaHarmony: "1.5.0",
            MuditaPure: "1.0.0",
          },
        },
        updateRequired: false,
      },
    },
    loadSettings.fulfilled(undefined, requestId, undefined),
  ])
  expect(getSettings).toHaveBeenCalled()
  expect(getApplicationConfiguration).toHaveBeenCalled()
})
