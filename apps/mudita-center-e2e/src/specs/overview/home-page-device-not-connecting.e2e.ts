import screenshotHelper from "../../helpers/screenshot.helper"
import HomePage from "../../page-objects/home.page"

describe("Home Screen Page", () => {
  it("Opens Home Page", async () => {
    const homeHeader = await HomePage.homeHeader
    await expect(homeHeader).toBeDisplayed()
    await expect(homeHeader).toHaveText("Welcome to Mudita Center")
  })
  it("Click on My Device doesn't show up", async () => {
    const myDevicesDoesntShowButton = await HomePage.myDevicesDoesntShowButton
    await expect(myDevicesDoesntShowButton).toBeDisplayed()
    await myDevicesDoesntShowButton.click()
  })
  it("Verify Contents", async () => {
    const weAreSorryPageHeader = await HomePage.weAreSorryPageHeader
    const weAreSorryPageFollowTheInstructionsParagraph =
      await HomePage.weAreSorryPageFollowTheInstructionsParagraph
    const weAreSorryPageInstructionsList =
      await HomePage.weAreSorryPageInstructionsList
    await expect(weAreSorryPageHeader).toHaveText(
      "There was a connection problem"
    )
    await expect(weAreSorryPageFollowTheInstructionsParagraph).toHaveText(
      "Follow the instructions below"
    )
    await expect(weAreSorryPageInstructionsList[0]).toHaveText(
      "Disconnect the device from the computer"
    )
    await expect(weAreSorryPageInstructionsList[1]).toHaveText(
      "Restart the device"
    ),
      await expect(weAreSorryPageInstructionsList[2]).toHaveText(
        "Reconnect the device to the computer"
      ),
      await expect(weAreSorryPageInstructionsList[3]).toHaveText(
        "Unlock your Mudita device's screen (if applicable)"
      )
  })
  it("Click this didn't solve the problem & click Try Again", async () => {
    const thisDidntSolveParagraph = await HomePage.thisDidntSolveParagraph
    const tryAgainParagraph = await HomePage.tryAgainParagraph
    await expect(thisDidntSolveParagraph).toBeDisplayed()
    await thisDidntSolveParagraph.click()
    await expect(tryAgainParagraph).toBeDisplayed()
    await tryAgainParagraph.click()
  })
  it("Click Contact Support & Verify Contents", async () => {
    const contactSupportButton = await HomePage.contactSupportButton
    const muditaCenterSupportModalHeader =
      await HomePage.muditaCenterSupportModalHeader
    const emailField = await HomePage.emailField
    const messageField = await HomePage.messageField
    const attachedFile = await HomePage.attachedFile
    const sendButton = await HomePage.sendButton
    await expect(contactSupportButton).toBeDisplayed()
    await contactSupportButton.click()
    await expect(muditaCenterSupportModalHeader).toBeDisplayed()
    await expect(muditaCenterSupportModalHeader).toHaveText(
      "Mudita Center Support"
    )
    await expect(emailField).toBeDisplayed()
    await emailField.click()
    await expect(emailField).toBeFocused()
    await emailField.setValue("support@mudita.com")
    await expect(emailField).toHaveValue("support@mudita.com")
    await expect(messageField).toBeDisplayed()
    await messageField.click()
    await expect(messageField).toBeFocused()
    await messageField.setValue("Message")
    await expect(messageField).toHaveValue("Message")
    await expect(attachedFile).toBeDisplayed()
    await expect(sendButton).toBeDisplayed()
  })
  it("Click Close Center Support Modal & Verify if modal is not present", async () => {
    const closeCenterSupportModal = await HomePage.closeCenterSupportModalButton
    const centerSupportModal = await HomePage.centerSupportModal
    await expect(closeCenterSupportModal).toBeDisplayed()
    await closeCenterSupportModal.click()
    await expect(centerSupportModal).not.toBeDisplayed()
  })
})
