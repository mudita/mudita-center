/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import ModalPage from "./modal.page"

class TemplatesPage extends ModalPage {
  public get newTemplateButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="templates-panel-button"]')
  }

  public get templateTextInputForm(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="template-form-text-filed"]')
  }

  public get saveButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="template-form-save-button"]')
  }

  /** Insert text to Search Contacts input field*/
  async insertTextToTemplateTextInputForm(inputText: string) {
    await this.templateTextInputForm.waitForDisplayed()
    await this.templateTextInputForm.setValue(inputText)
  }

  public get templateCheckbox(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="template-checkbox"]')
  }

  public get selectAllTemplatesCheckbox(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="checkbox"]')
  }

  /** Insert text to Search Contacts input field*/
  async clickOnTemplateByText(inputText: string) {
    const selector = await $(`p*=${inputText}`)
    await selector.click()
  }

  /** Insert text to Search Contacts input field*/
  async hoverOverTemplateByText(inputText: string) {
    const selector = await $(`p*=${inputText}`)
    await selector.moveTo()
  }
}
export default new TemplatesPage()
