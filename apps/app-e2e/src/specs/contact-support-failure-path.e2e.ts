/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { goToSupportModal } from "../helpers/contact-support.helper"
import ContactSupport from "../page-objects/contact-support.page"
import testsHelper from "../helpers/tests.helper"

describe("Contact Support - Failure Path", () => {
  before(async () => {
    await goToSupportModal()
  })

  // The test is skipped until a mocking system for HTTP requests in the main process has been implemented.
  xit("should display an error message when sending fails", async () => {
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

    // TODO: AFTER E2E_MOCKS_IMPLEMENTED - Mock the request to return an error response

    await sendButton.click()
  })
})
