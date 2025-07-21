/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "e2e-mock/client"
import { MockAppHttpResponsePayload } from "app-utils/models"
import Menu from "../page-objects/menu.page"
import HelpPage from "../page-objects/help.page"
import ContactSupport from "../page-objects/contact-support.page"

export async function goToSupportModal(payload?: MockAppHttpResponsePayload) {
  if (process.env.MOCK_SERVER_ENABLED === "1" && payload) {
    await E2EMockClient.connect()
    E2EMockClient.mockAppHttpResponse(payload)
  }
  // should open Mudita Help Center
  const helpTab = await Menu.helpLink
  await helpTab.waitForDisplayed()
  await helpTab.click()

  await openSupportModal()
}

export async function openSupportModal() {
  // should open Contact Support modal
  const csButton = await HelpPage.contactSupportButton
  await csButton.waitForDisplayed()
  await csButton.click()

  // should wait for Contact Support modal to be displayed
  await (await ContactSupport.formModalTitle).waitForDisplayed()
}
