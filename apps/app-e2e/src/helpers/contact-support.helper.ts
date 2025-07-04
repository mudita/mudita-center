/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Menu from "../page-objects/menu.page"
import HelpPage from "../page-objects/help.page"
import ContactSupport from "../page-objects/contact-support.page"

export async function goToSupportModal() {
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
