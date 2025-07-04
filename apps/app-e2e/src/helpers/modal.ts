/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatMessage, Messages } from "app-localize/utils"
import { ModalTestId } from "../all-test-ids"
import Page from "../page-objects/page"

export default class Modal {
  private readonly modalTitleText: string

  constructor(formatMessageModalId: Messages["id"]) {
    this.modalTitleText = formatMessage({ id: formatMessageModalId })
  }

  public get modal() {
    return $(
      `//div[@data-testid="${ModalTestId.Modal}"][.//h1[@data-testid="${ModalTestId.Title}" and text()="${this.modalTitleText}"]]`
    )
  }

  public get title() {
    return this.modal.$(`[data-testid="${ModalTestId.Title}"]`)
  }

  public get titleIcon() {
    return this.modal.$(`[data-testid="${ModalTestId.TitleIcon}"]`)
  }

  public get closeButton() {
    return this.modal.$(`[data-testid="${ModalTestId.CloseButton}"]`)
  }
}
