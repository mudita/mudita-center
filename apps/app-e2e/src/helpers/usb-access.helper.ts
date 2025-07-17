/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "e2e-mock/client"
import { SetUsbAccessPayload } from "app-init/models"
import AppInitPage from "../page-objects/app-init.page"

export const simulateAppInitUsbAccessStep = async (
  payload: SetUsbAccessPayload
) => {
  // should open USB Access Modal
  if (process.env.MOCK_SERVER_ENABLED === "1") {
    await E2EMockClient.connect()

    E2EMockClient.setUsbAccess(payload)
  }
  await AppInitPage.acceptPrivacyPolicy()
}
