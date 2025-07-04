/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { goToSupportModal } from "../helpers/contact-support.helper"
import ContactSupport from "../page-objects/contact-support.page"
import testsHelper from "../helpers/tests.helper"

describe("Contact Support - Happy Path", () => {
  before(async () => {
    await goToSupportModal()
  })

  // The test is skipped until a mocking system for HTTP requests in the main process has been implemented.
  xit("should send a message successfully", async () => {
    await testsHelper.insertTextToElement(
      await ContactSupport.formModalEmailInput,
      "example@mudita.com"
    )
    await testsHelper.insertTextToElement(
      await ContactSupport.formModalDescriptionInput,
      "This is test message from automatic tests execution. Please discard it"
    )

    const sendButton = await ContactSupport.formModalSendButton
    await expect(sendButton).toBeClickable()
    await expect(sendButton).toBeEnabled()
    await expect(sendButton).toHaveText("SEND")

    // TODO: AFTER E2E_MOCKS_IMPLEMENTED - Mock the request to prevent sending real email

    await sendButton.click()
  })
})
