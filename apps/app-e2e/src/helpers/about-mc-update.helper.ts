/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "e2e-mock/client"
import { SetAppUpdaterCheckPayload } from "app-updater/models"
import SettingsPage from "../page-objects/settings.page"

export const simulateMcUpdateCheckFromAbout = async (
  payload: SetAppUpdaterCheckPayload
) => {
  if (process.env.MOCK_SERVER_ENABLED === "1") {
    await E2EMockClient.connect()
    E2EMockClient.setAppUpdaterCheckResult(payload)
  }

  await SettingsPage.settingsMenuItem.click()
  await SettingsPage.aboutTab.click()
}
