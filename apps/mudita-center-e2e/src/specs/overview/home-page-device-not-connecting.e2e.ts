import HomePage from "../../page-objects/home.page"

describe("Home Screen Page", () => {
  it("Opens Home Page", async () => {
    const homeHeader = await HomePage.homeHeader
    await expect(homeHeader).toBeDisplayed()
    await expect(homeHeader).toHaveText("Welcome to Mudita Center")
  })
  it("Click on My Device doesn't show up", async () => {
    const myDevicesDoesntShowButton = HomePage.myDevicesDoesntShowButton
    await expect(myDevicesDoesntShowButton).toBeDisplayed()
    await myDevicesDoesntShowButton.click()
  })
  it("Verify Contents", async () => {
    const weAreSorryPage = await HomePage.weAreSorryPage
    const weAreSorryPageFollowTheInstructions =
      await HomePage.weAreSorryPageFollowTheInstructions
    const weAreSorryPageInstructions = await HomePage.weAreSorryPageInstructions
    await expect(weAreSorryPage).toHaveText("There was a connection problem")
    await expect(weAreSorryPageFollowTheInstructions).toHaveText(
      "Follow the instructions below"
    )
    await expect(weAreSorryPageInstructions[0]).toHaveText(
      "Disconnect the device from the computer"
    )
    await expect(weAreSorryPageInstructions[1]).toHaveText(
      "Restart the device"
    ),
      await expect(weAreSorryPageInstructions[2]).toHaveText(
        "Reconnect the device to the computer"
      ),
      await expect(weAreSorryPageInstructions[3]).toHaveText(
        "Unlock your Mudita device's screen (if applicable)"
      )
  })
  it("Click this didn't solve the problem & click Try Again", async () => {
    const thisDidntSolve = await HomePage.thisDidntSolve
    const tryAgain = await HomePage.tryAgain
    await expect(thisDidntSolve).toBeDisplayed()
    await thisDidntSolve.click()
    await expect(tryAgain).toBeDisplayed()
    await tryAgain.click()
  })
  it("Click Contact Support & Verify Contents", async () => {
    const contactSupportButton = await HomePage.contactSupportButton
    const muditaCenterSupportModal = await HomePage.muditaCenterSupportModal
    const emailField = await HomePage.emailField
    const messageField = await HomePage.messageField
    const attachedFile = await HomePage.attachedFile
    const sendButton = await HomePage.sendButton
    await expect(contactSupportButton).toBeDisplayed()
    await contactSupportButton.click()
    await expect(muditaCenterSupportModal).toBeDisplayed()
    await expect(muditaCenterSupportModal).toHaveText("Mudita Center Support")
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
    const closeCenterSupportModal = await HomePage.closeCenterSupportModal
    const centerSupportModal = await HomePage.centerSupportModal
    await expect(closeCenterSupportModal).toBeDisplayed()
    await closeCenterSupportModal.click()
    await expect(centerSupportModal).not.toBeDisplayed()
  })
})
