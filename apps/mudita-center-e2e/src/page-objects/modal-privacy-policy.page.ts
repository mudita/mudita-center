/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalPrivacyPolicy extends Page {
  public get modalHeader() {
    return $('[data-testid="privacy-policy-component-title"]')
  }

  public get first() {
    return $(
      "p*=Who is the controller of your personal data and who can you contact about it?"
    )
  }

  public get second() {
    return $(
      "p*=For what purposes and on what grounds do we process your personal data?"
    )
  }

  public get third() {
    return $("p*=Who has access to your personal data?")
  }

  public get fourth() {
    return $("p*=How long is your personal data stored?")
  }

  public get fifth() {
    return $(
      "p*=What rights do you have in relation to the processing of your personal data?"
    )
  }

  public get sixth() {
    return $("p*=How to exercise your personal data rights?")
  }

  public get seventh() {
    return $("p*=Is providing personal data mandatory?")
  }

  public get eighth() {
    return $("p*=Cookies")
  }

  public get nineth() {
    return $("p*=Additional information")
  }

  public get firstColumnHeader() {
    return $("p*=the purpose of the processing")
  }

  public get secondColumnHeader() {
    return $("p*=legal basis for the processing")
  }

  public get firstParagraph() {
    return $("p*=The Controller of your personal data")
  }
}

export default new ModalPrivacyPolicy()
