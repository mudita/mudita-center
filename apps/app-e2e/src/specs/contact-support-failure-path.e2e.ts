/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  goToSupportModal,
  itBehavesLikeFormModal,
  itBehavesLikeSendingModal,
} from "../helpers/contact-support.helper"
import ContactSupport from "../page-objects/contact-support.page"
import { AppError, AppResultFactory } from "app-utils/models"

describe("Contact Support - Failure Path", () => {
  before(async () => {
    await goToSupportModal({
      method: "POST",
      url: "/api/v2/tickets",
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

    it("should display action controls", async () => {
      await expect(ContactSupport.errorModalCloseButton).not.toBeDisplayed()
      await expect(ContactSupport.errorModalButton).toBeDisplayed()
    })

    it("should allows to close full screen layout when clicking ok modal button", async () => {
      await ContactSupport.errorModalButton.waitForDisplayed()
      await ContactSupport.errorModalButton.click()
      await expect(ContactSupport.errorModal).not.toBeDisplayed()
    })
  })
})
