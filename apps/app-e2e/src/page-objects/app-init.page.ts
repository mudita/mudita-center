/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"
import { formatMessage } from "app-localize/utils"
import { ModalTestId } from "../all-test-ids"

class AppInitPage extends Page {
  public async reloadApp() {
    await browser.reloadSession()
    await this.ensureAppIsOpen()
  }

  public ensureAppIsOpen() {
    return browser.waitUntil(
      async () => {
        try {
          await browser.getTitle()
          return true
        } catch {
          return false
        }
      },
      {
        timeout: 10000,
        timeoutMsg: "App did not open in expected time",
      }
    )
  }

  public ensureAppIsClosed() {
    return browser.waitUntil(
      async () => {
        try {
          await browser.getTitle()
          return false
        } catch {
          return true
        }
      },
      {
        timeout: 10000,
        timeoutMsg: "App did not close in expected time",
      }
    )
  }

  public get privacyPolicyModal() {
    return $(
      `//div[@data-testid="${ModalTestId.Modal}"][.//h1[@data-testid="${ModalTestId.Title}" and text()="${formatMessage({ id: "general.privacyPolicyModal.title" })}"]]`
    )
  }

  public get privacyPolicyButton() {
    return this.privacyPolicyModal.$(`//p/following-sibling::button[1]`)
  }

  public get privacyPolicyCancelButton() {
    return this.privacyPolicyModal.$(
      `//button[@data-testid="${ModalTestId.CloseButton}"]`
    )
  }

  public get privacyPolicyAcceptButton() {
    return this.privacyPolicyModal.$(
      `//div[@data-testid="${ModalTestId.Buttons}"]/button[1]`
    )
  }

  public async acceptPrivacyPolicy() {
    if (await this.privacyPolicyAcceptButton.isDisplayed()) {
      await this.privacyPolicyAcceptButton.click()
    }
  }
}

export default new AppInitPage()
