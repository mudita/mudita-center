import NavigationTabs from "../../page-objects/tabs.page"
import OverviewPage from "../../page-objects/overview.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"

describe("Overview screen check", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    await ModalGeneralPage.closeModalButtonClick()
    await NavigationTabs.overviewTabClick()
  })
  it("Click on Overview tab and check 'Overview' text label is displayed", async () => {
    const overviewTab = await NavigationTabs.overviewTab
    await overviewTab.waitForDisplayed()
    await overviewTab.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
    const locationTextLabel = await OverviewPage.locationTextLabel
    const locationTextLabelText = await locationTextLabel.getText()
    await expect(locationTextLabelText).toEqual("Overview")
  })

  it("Click on 'About Your Pure' button and check 'CHECK SAR INFORMATION' link is displayed", async () => {
    const about = await OverviewPage.aboutYourPureButton
    await about.waitForDisplayed({ timeout: 4000 })
    await about.click()

    const sarLink = await OverviewPage.checkSARInformationButton
    await expect(sarLink).toBeDisplayed()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
  })

  it("Check Disconnect button is displayed", async () => {
    await NavigationTabs.overviewTabClick()

    const disconnectButton = await OverviewPage.disconnectButton
    await disconnectButton.waitForDisplayed({ timeout: 4000 })
    await expect(disconnectButton).toBeDisplayed()
  })

  it("Check battery level and corresponding battery icon", async () => {
    await NavigationTabs.overviewTabClick()

    const batteryLevel = await OverviewPage.batteryLevel
    await batteryLevel.waitForDisplayed({ timeout: 4000 })
    await expect(batteryLevel).toBeDisplayed()
    const batteryLevelValue = await batteryLevel.getText()
    const batteryValueFloat = parseFloat(batteryLevelValue)

    if (batteryValueFloat === 100) {
      const batteryLevelIcon = await OverviewPage.fullBatteryIcon
      await expect(batteryLevelIcon).toBeDisplayed()
    } else if (batteryValueFloat > 80) {
      const batteryLevelIcon = await OverviewPage.veryHighBatteryIcon
      await expect(batteryLevelIcon).toBeDisplayed()
    } else if (batteryValueFloat > 60) {
      const batteryLevelIcon = await OverviewPage.highBatteryIcon
      await expect(batteryLevelIcon).toBeDisplayed()
    } else if (batteryValueFloat > 40) {
      const batteryLevelIcon = await OverviewPage.mediumBatteryIcon
      await expect(batteryLevelIcon).toBeDisplayed()
    } else if (batteryValueFloat > 20) {
      const batteryLevelIcon = await OverviewPage.lowBatteryIcon
      await expect(batteryLevelIcon).toBeDisplayed()
    } else if (batteryValueFloat > 0) {
      const batteryLevelIcon = await OverviewPage.veryLowBatteryIcon
      await expect(batteryLevelIcon).toBeDisplayed()
    }
  })

  it("Check network name and signal strength icon", async () => {
    const networkName = await OverviewPage.networkName
    await networkName.waitForDisplayed({ timeout: 4000 })
    await expect(networkName).toBeDisplayed()

    await expect(networkName).toHaveTextContaining([
      "Plus",
      "Orange",
      "Play",
      "T-Mobile",
    ])

    const oneOfThoseShouldBeDisplayed = [
      await OverviewPage.LowRangeIcon.isDisplayed(),
      await OverviewPage.MediumRangeIcon.isDisplayed(),
      await OverviewPage.HighRangeIcon.isDisplayed(),
      await OverviewPage.VeryHighRangeIcon.isDisplayed(),
    ]

    expect(oneOfThoseShouldBeDisplayed.filter(Boolean)).toHaveLength(1)
  })

  it("Check offline mode", async () => {
    const networkName = await OverviewPage.networkName

    await expect(networkName).not.toBeDisplayed()

    const noRangeIcon = OverviewPage.noRangeIcon
    await noRangeIcon.waitForDisplayed({ timeout: 4000 })
    expect(noRangeIcon).toBeDisplayed()
  })

  it("Check device image is displayed", async () => {
    await NavigationTabs.overviewTabClick()

    const PureGreyImage = await OverviewPage.pureGrayImage
    const PureBlackImage = await OverviewPage.pureBlackImage

    if ((await PureGreyImage.isDisplayed()) === true) {
      await expect(PureGreyImage).toBeDisplayed()
    } else if ((await PureBlackImage.isDisplayed()) === true) {
      await expect(PureBlackImage).toBeDisplayed()
    } else {
      expect(false).toBeTruthy()
    }
  })

  it("Check serial number in about your Pure matches serial number displayed on overview screen", async () => {
    await NavigationTabs.overviewTabClick()

    const aboutYourPure = await OverviewPage.aboutYourPureButton
    await aboutYourPure.waitForDisplayed({ timeout: 4000 })
    await aboutYourPure.click()

    const serialNumberAboutYourPure =
      await OverviewPage.aboutYourPureSerialNumber
    await expect(serialNumberAboutYourPure).toBeDisplayed()
    const serialNumberAboutYourPureValue =
      await serialNumberAboutYourPure.getText()

    console.log(serialNumberAboutYourPureValue)

    const backToOverview = await OverviewPage.backToOverviewButton
    await backToOverview.click()

    const overviewSerialNumber = await OverviewPage.overviewSerialNumber
    const overviewSerialNumberValue = await overviewSerialNumber.getText()
    expect(serialNumberAboutYourPureValue.length > 13)
    expect(overviewSerialNumberValue.length > 13)
    expect(serialNumberAboutYourPureValue === overviewSerialNumberValue)
  })

  it("Check MuditaOS version format", async () => {
    await NavigationTabs.overviewTabClick()

    const MuditaOSVer = await OverviewPage.muditaOSVersion
    await MuditaOSVer.waitForDisplayed({ timeout: 4000 })
    const muditaOSVersion = await MuditaOSVer.getText()
    console.log(
      "checking if MuditaOS version (" +
        muditaOSVersion +
        ") matches the format: MuditaOS \\d.\\d.\\d"
    )
    expect(/MuditaOS \d.\d.\d/.test(muditaOSVersion)).toBeTruthy()
  })
})
