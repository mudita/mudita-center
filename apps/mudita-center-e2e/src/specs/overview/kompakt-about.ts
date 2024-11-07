/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { overviewDataWithOneSimCard } from "../../../../../libs/e2e-mock/responses/src"
import homePage from "../../page-objects/home.page"
import menu from "../../page-objects/menu.page"
import overviewKompaktPage from "../../page-objects/overview-kompakt.page"
import aboutKompaktPage from "../../page-objects/about-kompakt.page"
import modalSarPage from "../../page-objects/modal-sar.page"
import { kompaktImeiRegex } from "../../consts/regex-const"

describe("Checking About your Kompakt", () => {
  before(async () => {
    E2EMockClient.connect()
    //wait for a connection to be established
    await browser.waitUntil(() => {
      return E2EMockClient.checkConnection()
    })
  })

  it("Connect device", async () => {
    E2EMockClient.mockResponse({
      path: "path-1",
      body: overviewDataWithOneSimCard,
      endpoint: "FEATURE_DATA",
      method: "GET",
      status: 200,
    })

    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "first-serial-number",
    })

    await browser.pause(6000)
    const menuOverviewLink = await menu.overviewLink
    await menuOverviewLink.waitForDisplayed({ timeout: 10000 })
    await expect(menuOverviewLink).toBeDisplayed()
  })

  it("Check SN", async () => {
    const serialNumberValue = await overviewKompaktPage.serialNumberValue
    await expect(serialNumberValue).toHaveText(
      overviewDataWithOneSimCard.summary.about.serialNumber.text
    )
  })

  it("Go to ABOUT YOUR DEVICE", async () => {
    const aboutYourDevice = await overviewKompaktPage.aboutYourDevice
    await aboutYourDevice.waitForClickable()
    await aboutYourDevice.click()

    // Header
    const aboutHeader = await aboutKompaktPage.aboutHeader
    await expect(aboutHeader).toBeDisplayed()
    await expect(aboutHeader).toHaveText("About your device")
  })

  it("Verify About Your Device page", async () => {
    // Subtitle
    const aboutSubtitle = await aboutKompaktPage.aboutSubtitle
    await expect(aboutSubtitle).toHaveText("Device details")
    // SN
    const serialNumberLabel = await aboutKompaktPage.serialNumberLabel
    await expect(serialNumberLabel).toHaveText("Serial number")
    const serialNumberValue = await aboutKompaktPage.serialNumberValue
    await expect(serialNumberValue).toHaveText(
      overviewDataWithOneSimCard.summary.about.serialNumber.text
    )
    // IMEI 1
    const imei1Label = await aboutKompaktPage.imei1Label
    await expect(imei1Label).toHaveText("IMEI (sim slot 1)")
    const imei1Value = await aboutKompaktPage.imei1Value
    const imei1 = await imei1Value.getText()
    await expect(imei1Value).toHaveText(kompaktImeiRegex)
    // IMEI 2
    const imei2Label = await aboutKompaktPage.imei2Label
    await expect(imei2Label).toHaveText("IMEI (sim slot 2)")
    const imei2Value = await aboutKompaktPage.imei2Value
    const imei2 = await imei2Value.getText()
    await expect(imei2Value).toHaveText(kompaktImeiRegex)
    //SAR
    const sarLabel = await aboutKompaktPage.sarLabel
    await expect(sarLabel).toHaveText("SAR")
    const sarButton = await aboutKompaktPage.sarButton
    await expect(sarButton).toHaveText("Check SAR information")
    await expect(sarButton).toBeClickable()
  })

  it("Go to SAR information", async () => {
    const sarButton = await aboutKompaktPage.sarButton
    await sarButton.waitForClickable()
    await sarButton.click()
    const sarHeader = await aboutKompaktPage.sarHeader
    await expect(sarHeader).toHaveText("SAR")
    // TBD: SAR content + scroll
  })

  it("Close SAR information", async () => {
    const modalCloseButton = await modalSarPage.modalCloseButton
    await expect(modalCloseButton).toBeDisplayed()
    await modalCloseButton.click()
  })

  it("Go to Overview", async () => {
    const backToOverviewIcon = await aboutKompaktPage.backToOverviewIcon
    await backToOverviewIcon.isDisplayed()

    const backToOverviewLabel = await aboutKompaktPage.backToOverviewLabel
    await backToOverviewLabel.isDisplayed()
    backToOverviewLabel.click()

    const header = await overviewKompaktPage.header
    await header.isDisplayed()

    const menuOverviewLink = await menu.overviewLink
    await expect(menuOverviewLink).not.toBeClickable()
  })

  it("Disconnect the device and check if Welcome screen is present", async () => {
    E2EMockClient.removeDevice("path-1")
    const homeHeader = await homePage.homeHeader
    await expect(homeHeader).toBeDisplayed()
  })

  after(() => {
    E2EMockClient.stopServer()
    E2EMockClient.disconnect()
  })
})
