/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class HomePage extends Page {
    get homeHeader() {
        return $("h1*=Welcome to Mudita Center")
    }

    get myDevicesDoesntShowButton() {
        return $$("button")[2].$("p*=My device");
    }

    get weAreSorryPage() {
        return $("h2*=There was a connection problem")
    }

    get weAreSorryPageFollowTheInstructions() {
        return $("p*=Follow the instructions below")
    }

    get weAreSorryPageInstructions() {
        return $("li*=Disconnect the device from the computer");
    }

    get weAreSorryPageInstructions1() {
        return $("li*=Restart the device");
    }

    get weAreSorryPageInstructions2() {
        return $("li*=Reconnect the device to the computer");
    }

    get weAreSorryPageInstructions3() {
        return $("li*=Unlock your Mudita device's screen (if applicable)");
    }

    get thisDidntSolve() {
        return $$("button")[1].$("p*=This did");
    }

    get tryAgain() {
        return $("button[data-testid='onboarding-troubleshooting-ui-retry']").$("p*=Try again");
    }

    get contactSupportButton() {
        return $("button[data-testid=onboarding-troubleshooting-ui-contact-support]");
    }

    get muditaCenterSupportModal() {
        return $("h2[data-testid=modal-title]");
    }

    get emailField() {
        return $("input[data-testid='email-input']");
    }

    get messageTextArea() {
        return $("textarea[data-testid='description-input']");
    }

    get attachedFilesSection() {
        return $("ul[data-testid='file-list']");
    }

    get sendButton() {
        return $("button[data-testid='submit-button']");
    }    
    
    get closeCenterSupportModalButton() {
        return $("button[data-testid=close-modal-button]");
    }

    get centerSupportModal() {
        return $("div[data-testid='contact-support-modal']");
    }

} export default new HomePage()
