import NavigationTabs from "../../page-objects/tabs.page"
import OverviewPage from "../../page-objects/overview.page"
import ModalGeneralPage from "../../page-objects/modal.general"

describe("Overview screen check", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    try {
      const closeButton = ModalGeneralPage.closeIcon
      await closeButton.click()
    } catch (error) {
      console.log(error)
    }
  })

  xit("Click on Overview tab and check 'Overview' text label is displayed", async () => {
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

  xit("Click on 'About Your Pure' button and check 'CHECK SAR INFORMATION' link is displayed", async () => {
    await NavigationTabs.overviewTabClick()

    const about = await OverviewPage.aboutYourPureButton
    await about.waitForDisplayed({ timeout: 4000 })
    await about.click()

    const sarLink = await OverviewPage.checkSARInfoLink
    await expect(sarLink).toBeDisplayed()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
  })

  xit("Check Disconnect button is displayed", async () => {
    await NavigationTabs.overviewTabClick()

    const disconnectButton = await OverviewPage.disconnectButton
    await disconnectButton.waitForDisplayed({ timeout: 4000 })
    await expect(disconnectButton).toBeDisplayed()
  })

  xit("Check battery level and corresponding battery icon", async () => {
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

  xit("Check network name and signal strength icon", async () => {
    await NavigationTabs.overviewTabClick()

    const networkName = await OverviewPage.networkName
    await networkName.waitForDisplayed({ timeout: 4000 })
    await expect(networkName).toBeDisplayed()
    const networkNameValue = await networkName.getText()
    console.log(networkNameValue)
    await expect(networkName).toHaveTextContaining([
      "Plus",
      "Orange",
      "Play",
      "T-Mobile",
    ])

    const NoRange = await OverviewPage.noRangeIcon
    const LowRange = await OverviewPage.LowRangeIcon
    const MediumRange = await OverviewPage.MediumRangeIcon
    const HighRange = await OverviewPage.HighRangeIcon
    const VeryHighRange = await OverviewPage.VeryHighRangeIcon

    if ((await NoRange.isDisplayed()) === true) {
      await expect(NoRange).toBeDisplayed()
    } else if ((await LowRange.isDisplayed()) === true) {
      await expect(LowRange).toBeDisplayed()
    } else if ((await MediumRange.isDisplayed()) === true) {
      await expect(MediumRange).toBeDisplayed()
    } else if ((await HighRange.isDisplayed()) === true) {
      await expect(HighRange).toBeDisplayed()
    } else if ((await VeryHighRange.isDisplayed()) === true) {
      await expect(VeryHighRange).toBeDisplayed()
    } else {
      expect(false).toBeTruthy()
    }
  })

  xit("Check device image is displayed", async () => {
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
})
