/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalLicense extends Page {
  public get modalHeader() {
    return $('h2[data-testid="license-component-title"]')
  }

  public get definitionsParagraph() {
    return $("p*=Definitions:")
  }

  public get muditaDefinition() {
    return $("p*=Mudita sp. z o.o.")
  }

  public get licenseTermsParagraph() {
    return $("p*=License terms:")
  }

  public get transferOfDataParagraph() {
    return $("p*=Transfer of data:")
  }

  public get limitationParagraph() {
    return $("p*=Limitation of liability:")
  }

  public get copyrightParagraph() {
    return $("p*=Copyright / Third-party services:")
  }

  public get amendmentsParagraph() {
    return $("p*=Amendments to the Terms:")
  }

  public get applicableLawParagraph() {
    return $("p*=Applicable law:")
  }
}

export default new ModalLicense()
