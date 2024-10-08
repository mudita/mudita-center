/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ModalPage from "./modal.page"

class TemplatesPage extends ModalPage {
  public get newTemplateButton() {
    return $('[data-testid="templates-panel-button"]')
  }

  public get templateTextInputForm() {
    return $('[data-testid="template-form-text-filed"]')
  }

  public get saveButton() {
    return $('[data-testid="template-form-save-button"]')
  }

  /** Insert text to Search Contacts input field*/
  async insertTextToTemplateTextInputForm(inputText: string) {
    await this.templateTextInputForm.waitForDisplayed()
    await this.templateTextInputForm.setValue(inputText)
  }

  public get templateCheckbox() {
    return $('[data-testid="template-checkbox"]')
  }

  public get selectAllTemplatesCheckbox() {
    return $('[data-testid="checkbox"]')
  }

  /** Click on Template based on the given text*/
  async clickOnTemplateByText(inputText: string) {
    const selector = await $(`p*=${inputText}`)
    await selector.waitForClickable()
    await selector.click()
  }

  /** Hover over Template based on the given text*/
  async hoverOverTemplateByText(inputText: string) {
    const selector = await $(`p*=${inputText}`)
    await selector.waitForDisplayed()
    await selector.moveTo()
  }
}
export default new TemplatesPage()
