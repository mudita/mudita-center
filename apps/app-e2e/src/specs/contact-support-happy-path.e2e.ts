/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppResultFactory } from "app-utils/models"
import {
  goToSupportModal,
  itBehavesLikeFormModal,
  itBehavesLikeSendingModal,
} from "../helpers/contact-support.helper"
import ContactSupport from "../page-objects/contact-support.page"
import Menu from "../page-objects/menu.page"
import AppInitPage from "../page-objects/app-init.page"
import { NewsPaths } from "news/models"

describe("Contact Support - Happy Path", () => {
  before(async () => {
    await goToSupportModal({
      method: "POST",
      url: `${process.env.VITE_MUDITA_CENTER_SERVER_URL}/freshdesk`,
      response: AppResultFactory.success(),
    })
  })

  itBehavesLikeFormModal()
  itBehavesLikeSendingModal()

  describe("Contact Support Success Modal", () => {
    it("should display all core modal elements", async () => {
      await expect(ContactSupport.successModal).toBeDisplayed()
      await expect(ContactSupport.successModalTitle).toBeDisplayed()
      await expect(ContactSupport.successModalTitleIcon).toBeDisplayed()
      await expect(ContactSupport.successModalDescription).toBeDisplayed()
    })

    it("should display action controls", async () => {
      await expect(ContactSupport.successModalCloseButton).not.toBeDisplayed()
      await expect(ContactSupport.successModalButton).toBeDisplayed()
    })

    it("should navigate to the News page when clicking the OK button", async () => {
      await ContactSupport.successModalButton.waitForDisplayed()
      await ContactSupport.successModalButton.click()
      await expect(ContactSupport.successModal).not.toBeDisplayed()
      await Menu.newsLink.click()
      const url = await AppInitPage.getPageUrl()
      await expect(url).toBe(NewsPaths.Index)
    })
  })
})
