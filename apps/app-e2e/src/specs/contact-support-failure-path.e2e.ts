/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError, AppResultFactory } from "app-utils/models"
import { NewsPaths } from "news/models"
import {
  goToSupportModal,
  itBehavesLikeFormModal,
  itBehavesLikeSendingModal,
} from "../helpers/contact-support.helper"
import ContactSupport from "../page-objects/contact-support.page"
import Menu from "../page-objects/menu.page"
import AppInitPage from "../page-objects/app-init.page"

describe("Contact Support - Failure Path", () => {
  before(async () => {
    await goToSupportModal({
      method: "POST",
      url: `${process.env.VITE_MUDITA_CENTER_SERVER_URL}/freshdesk`,
      response: AppResultFactory.failed(new AppError()),
    })
  })

  itBehavesLikeFormModal()
  itBehavesLikeSendingModal()

  describe("Contact Support Failure Modal", () => {
    it("should display all core modal elements", async () => {
      await expect(ContactSupport.errorModal).toBeDisplayed()
      await expect(ContactSupport.errorModalTitle).toBeDisplayed()
      await expect(ContactSupport.errorModalTitleIcon).toBeDisplayed()
      await expect(ContactSupport.errorModalDescription).toBeDisplayed()
    })

    it("should display the action controls", async () => {
      await expect(ContactSupport.errorModalCloseButton).not.toBeDisplayed()
      await expect(ContactSupport.errorModalButton).toBeDisplayed()
    })

    it("should navigate to the News page when clicking the OK button", async () => {
      await ContactSupport.errorModalButton.waitForDisplayed()
      await ContactSupport.errorModalButton.click()
      await expect(ContactSupport.errorModal).not.toBeDisplayed()
      await Menu.newsLink.click()
      const url = await AppInitPage.getPageUrl()
      await expect(url).toBe(NewsPaths.Index)
    })
  })
})
