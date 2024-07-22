import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { overviewDataWithOneSimCard } from "../../../../../libs/e2e-mock/responses/src"
import HomePage from "../../page-objects/home.page"
import overviewKompaktPage from "../../page-objects/overview-kompakt.page"
import aboutKompaktPage from "../../page-objects/about-kompakt.page"
import modalSarPage from "../../page-objects/modal-sar.page"
import {
  kompaktSerialNumberRegex,
  kompaktImeiRegex,
} from "../../consts/regex-const"

describe("E2E mock sample - overview view", () => {
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
    //await browser.pause(6000)
    // const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)
    // await menuItem.waitForDisplayed({ timeout: 10000 })
    // await expect(menuItem).toBeDisplayed()
  })

  it("Go to ABOUT YOUR DEVICE", async () => {
    const aboutYourDevice = await overviewKompaktPage.aboutYourDevice
    await aboutYourDevice.waitForClickable()
    await aboutYourDevice.click()
  })

  it("Verify About Your Device page", async () => {
    // Header
    const aboutHeader = await aboutKompaktPage.aboutHeader
    await expect(aboutHeader).toHaveText("About your device")
    // SN
    const serialNumberLabel = await aboutKompaktPage.serialNumberLabel
    await expect(serialNumberLabel).toHaveText("Serial number")
    const serialNumberValue = await aboutKompaktPage.serialNumberValue
    const serial = await serialNumberValue.getText()
    console.log("Serial number: ", serial)
    await expect(serialNumberValue).toHaveText(kompaktSerialNumberRegex)
    // IMEI 1
    const imei1Label = await aboutKompaktPage.imei1Label
    await expect(imei1Label).toHaveText("IMEI (sim slot 1)")
    const imei1Value = await aboutKompaktPage.imei1Value
    const imei1 = await imei1Value.getText()
    console.log("IMEI 1: ", imei1)
    await expect(imei1Value).toHaveText(kompaktImeiRegex)
    // IMEI 2
    const imei2Label = await aboutKompaktPage.imei2Label
    await expect(imei2Label).toHaveText("IMEI (sim slot 2)")
    const imei2Value = await aboutKompaktPage.imei2Value
    const imei2 = await imei2Value.getText()
    console.log("IMEI 2: ", imei2)
    await expect(imei2Value).toHaveText(kompaktImeiRegex)
    //SAR
    const sarLabel = await aboutKompaktPage.sarLabel
    await expect(sarLabel).toHaveText("SAR")
    const sarButton = await aboutKompaktPage.sarButton
    await expect(sarButton).toBeClickable()
  })

  it("Go to SAR information", async () => {
    const sarButton = await aboutKompaktPage.sarButton
    await sarButton.waitForClickable()
    await sarButton.click()
    const sarHeader = await aboutKompaktPage.sarHeader
    await expect(sarHeader).toHaveText("SAR")
  })

  it("Close SAR information", async () => {
    const modalCloseButton = await modalSarPage.modalCloseButton
    await expect(modalCloseButton).toBeDisplayed()
    await modalCloseButton.click()
    // await browser.executeAsync((done) => {
    //   setTimeout(done, 1000000)
    // })
  })

  it("Go to Overview", async () => {
    const backToOverviewIcon = await aboutKompaktPage.backToOverviewIcon
    await backToOverviewIcon.isDisplayed()

    const backToOverviewLabel = await aboutKompaktPage.backToOverviewLabel
    await backToOverviewLabel.isDisplayed()
    backToOverviewLabel.click()

    const header = await overviewKompaktPage.header
    await header.isDisplayed()
  })

  it("Disconnect the device and check if Welcome screen is present", async () => {
    E2EMockClient.removeDevice("path-1")
    await HomePage.homeHeader.waitForDisplayed()
  })

  after(() => {
    E2EMockClient.stopServer()
    E2EMockClient.disconnect()
  })
})
