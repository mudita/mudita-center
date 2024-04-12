/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class HomePage extends Page {
  get homeHeader() {
    return $("h1*=Welcome to Mudita Center")
  }

  get notNowButton() {
    return $("button[data-testid='onboarding-not-now-button']")
  }

  get myDevicesDoesntShowButton() {
    return $(
      "button[data-testid='onboarding-my-device-does-not-show-up-button']"
    )
  }

  get weAreSorryPageHeader() {
    return $("h2[data-testid=onboarding-troubleshooting-title-header]")
  }

  get weAreSorryPageFollowTheInstructionsParagraph() {
    return $("p[data-testid='onboarding-troubleshooting-subtitle-paragraph']")
  }

  get weAreSorryPageInstructionsList() {
    return $$(
      "ol li[data-testid='onboarding-troubleshooting-instruction-step-list-item']"
    )
  }

  get thisDidntSolveParagraph() {
    return $(
      "button[data-testid='onboarding-troubleshooting-ui-more-instructions'] p"
    )
  }

  get tryAgainParagraph() {
    return $("button[data-testid='onboarding-troubleshooting-ui-retry'] p")
  }

  get contactSupportButton() {
    return $("[data-testid='onboarding-troubleshooting-ui-contact-support']")
  }

  get muditaCenterSupportModalHeader() {
    return $("h2[data-testid='modal-title']")
  }

  get emailField() {
    return $("input[data-testid='email-input']")
  }

  get messageField() {
    return $("textarea[data-testid='description-input']")
  }

  get attachedFile() {
    return $("ul[data-testid='file-list']")
  }

  get sendButton() {
    return $("button[data-testid='submit-button']")
  }

  get closeCenterSupportModalButton() {
    return $("button[data-testid='close-modal-button']")
  }

  get centerSupportModal() {
    return $("div[data-testid='contact-support-modal']")
  }
}
export default new HomePage()
