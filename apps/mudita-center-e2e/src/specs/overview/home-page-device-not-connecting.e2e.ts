import HomePage from "../../page-objects/home.page"
import {sleep} from "../../helpers/sleep.helper"

// npx wdio run wdio.conf.ts --spec ./src/specs/overview/home-page.e2e.ts
describe("Home Screen Page", () => {
    before(async () => {
        // Waiting for device connected through USB
        await browser.executeAsync((done) => {
            setTimeout(done, 10000)
        })
    })
    it("Opens Home Page", async () => {
        const welcomeHeader = await HomePage.homeHeader
        await expect(welcomeHeader).toBeDisplayed()
        await expect(welcomeHeader).toHaveText('Welcome to Mudita Center');
    })
    it("Click on My Device doesn't show up", async () => {
        const myDevicesDoesntShowButton = HomePage.myDevicesDoesntShowButton
        await expect(myDevicesDoesntShowButton).toBeDisplayed()
        await myDevicesDoesntShowButton.click();
    })
     it("Verify Contents", async () => {
        const connectionProblem = await HomePage.weAreSorryPage
        const connectionProblemFollow = await HomePage.weAreSorryPageFollowTheInstructions
        const connectionProblemInstructions = await HomePage.weAreSorryPageInstructions
        const connectionProblemInstructions1 = await HomePage.weAreSorryPageInstructions1
        const connectionProblemInstructions2 = await HomePage.weAreSorryPageInstructions2
        const connectionProblemInstructions3 = await HomePage.weAreSorryPageInstructions3
        await expect(connectionProblem).toHaveText('There was a connection problem')
        await expect(connectionProblemFollow).toHaveText('Follow the instructions below')
        await expect(connectionProblemInstructions).toHaveText('Disconnect the device from the computer')
        await expect(connectionProblemInstructions1).toHaveText('Restart the device'),
        await expect(connectionProblemInstructions2).toHaveText('Reconnect the device to the computer'),
        await expect(connectionProblemInstructions3).toHaveText("Unlock your Mudita device's screen (if applicable)");
    })  
    it("Click this didn't solve the problem & click Try Again", async () => {
        const thisDidntSolveTheProblemButton = await HomePage.thisDidntSolve
        const tryAgainButton = await HomePage.tryAgain
        await expect(thisDidntSolveTheProblemButton).toBeDisplayed()
        await thisDidntSolveTheProblemButton.click()
        await expect(tryAgainButton).toBeDisplayed()
        await tryAgainButton.click()
    })
    it("Click Contact Support & Verify Contents", async () => {
        const contactSupportBtn = await HomePage.contactSupportButton
        const muditaCenterSupportPopup = await HomePage.muditaCenterSupportModal
        const emailFormField = await HomePage.emailField
        const messageField = await HomePage.messageTextArea
        const attachedFile = await HomePage.attachedFilesSection
        const sendButtonCheck = await HomePage.sendButton
        await expect(contactSupportBtn).toBeDisplayed()
        await contactSupportBtn.click();
        await expect(muditaCenterSupportPopup).toBeDisplayed()
        await expect(muditaCenterSupportPopup).toHaveText('Mudita Center Support')
        await expect(emailFormField).toBeDisplayed()
        await emailFormField.click()
        await emailFormField.setValue('test@test.com')
        await expect(emailFormField).toHaveValue('test@test.com')
        await expect(messageField).toBeDisplayed()
        await messageField.click()
        await messageField.setValue('TEST')
        await expect(messageField).toHaveValue('TEST')
        await expect(attachedFile).toBeDisplayed()
        await expect(sendButtonCheck).toBeDisplayed();
    })
    it("Click Close Center Support Modal & Verify if modal is not present", async () => {
        const closeCenterSupportModal = await HomePage.closeCenterSupportModalButton
        const centerSupportModal = await HomePage.centerSupportModal
        await expect(closeCenterSupportModal).toBeDisplayed()
        await closeCenterSupportModal.click()
        await expect(centerSupportModal).not.toBeDisplayed();
    })

})