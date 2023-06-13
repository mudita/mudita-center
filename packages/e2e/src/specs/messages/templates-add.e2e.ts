/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import navigationTabs from "../../page-objects/tabs.page"
import messagesPage from "../../page-objects/messages.page"
import messagesTemplatesPage from "../../page-objects/messages-templates.page"

import modalGeneralPage from "../../page-objects/modal-general.page"

import { getFullDate } from "../../helpers/general.helper"

describe("Templates", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.pause(10000)

    await modalGeneralPage.clickUpdateAvailableModalCloseButton()
    await navigationTabs.clickMessagesTab()
  })

  const templateText = `Template added by E2E test on ${getFullDate()}`

  it("Should add a new template ", async () => {
    const templatesTab = await messagesPage.templatesTab
    await templatesTab.waitForDisplayed()
    await templatesTab.click()

    const newTemplateButton = await messagesTemplatesPage.newTemplateButton
    await newTemplateButton.click()

    const saveButton = await messagesTemplatesPage.saveButton
    await expect(saveButton).toBeDisabled()

    await messagesTemplatesPage.insertTextToTemplateTextInputInputForm(
      templateText
    )

    await expect(saveButton).toBeEnabled()
    await saveButton.click()
    await browser.pause(8000)

    expect(await $(`p*=${templateText}`)).toBeDisplayed()
  })

  it("Should edit text of the template added in previous step", async () => {
    await messagesTemplatesPage.clickOnTemplateByText(templateText)

    const saveButton = await messagesTemplatesPage.saveButton

    const editedTemplateText = templateText.replace("added", "edited")
    await messagesTemplatesPage.insertTextToTemplateTextInputInputForm(
      editedTemplateText
    )

    await expect(saveButton).toBeEnabled()

    await saveButton.click()

    await browser.pause(8000)

    expect(await $(`p*=${editedTemplateText}`)).toBeDisplayed()
  })
})
