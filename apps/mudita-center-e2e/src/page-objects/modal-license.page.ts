/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalLicense extends Page {
  public get modalHeader() {
    return $('h2[data-testid="license-component-title"]')
  }

  public get firstParagraph() {
    return $(
      "p*=Please note that we provide an open source software notice with this app. "
    )
  }

  public get sectionWarrantyDisclaimer() {
    return $("p*=WARRANTY DISCLAIMER")
  }

  public get sectionNoticeForFile() {
    return $("p*=Notice for file(s):")
  }

  public get zodLibrarySection() {
    return $(`//p[contains(., concat('"', 'zod', '": "', '^3.22.4', '"'))]`)
  }

  public get zodLibraryCopyrightSection() {
    return $("p*=Copyright (c) 2020 Colin McDonnell")
  }
}

export default new ModalLicense()
