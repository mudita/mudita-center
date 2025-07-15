/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "e2e-mock/client"
import { SetAppUpdaterCheckPayload } from "app-updater/models"
import AppInitPage from "../page-objects/app-init.page"

export async function goToMcUpdate(payload: SetAppUpdaterCheckPayload) {
  // should open MC Update Modal
  if (process.env.MOCK_SERVER_ENABLED === "1") {
    await E2EMockClient.connect()

    E2EMockClient.setAppUpdaterCheckResult(payload)
  }
  await AppInitPage.acceptPrivacyPolicy()
}
