/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalPrivacyPolicy extends Page {
  public get modalHeader() {
    return $('[data-testid="privacy-policy-component-title"]')
  }

  public get controllerQuestion() {
    return $(
      "p*=Who is the controller of your personal data and who can you contact about it?"
    )
  }

  public get purposesQuestion() {
    return $(
      "p*=For what purposes and on what grounds do we process your personal data?"
    )
  }

  public get accessQuestion() {
    return $("p*=Who has access to your personal data?")
  }

  public get storageLengthQuestion() {
    return $("p*=How long is your personal data stored?")
  }

  public get rightsQuestion() {
    return $(
      "p*=What rights do you have in relation to the processing of your personal data?"
    )
  }

  public get rightsExcerciseQuestion() {
    return $("p*=How to exercise your personal data rights?")
  }

  public get dataProvidingMandatoryQuestion() {
    return $("p*=Is providing personal data mandatory?")
  }

  public get cookiesParagraph() {
    return $("p*=Cookies")
  }

  public get addInformationParagraph() {
    return $("p*=Additional information")
  }

  public get firstColumnHeader() {
    return $("p*=the purpose of the processing")
  }

  public get secondColumnHeader() {
    return $("p*=legal basis for the processing")
  }

  public get firstPoint() {
    return $("p*=The Controller of your personal data")
  }

  public get cookiesInfoLinks() {
    return $$("#app > div > ul > li")
  }
}

export default new ModalPrivacyPolicy()
