/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalTermsOfService extends Page {
  public get modalHeader() {
    return $('[data-testid="terms-of-service-component-title"]')
  }

  public get firstParagraph() {
    return $("p*=National Court Register")
  }

  public get sectionGeneralProvisions() {
    return $("p=GENERAL PROVISIONS")
  }

  public get sectionPurposeAndUse() {
    return $("p=PURPOSE AND USE OF THE APP")
  }

  public get sectionResponsibility() {
    return $("p=RESPONSIBILITY")
  }

  public get sectionConditionsOfUse() {
    return $("p=CONDITIONS OF USE")
  }

  public get sectionCommunication() {
    return $("p=COMMUNICATION AND FEEDBACK")
  }

  public get sectionFinalProvisions() {
    return $("p=FINAL PROVISIONS")
  }

  public get companyWebsiteLink() {
    return $("a=www.mudita.com")
  }

  public get companyEmailLink() {
    return $("a=hello@mudita.com")
  }

  public get privacyPolicyLink() {
    return $("a=www.mudita.com/legal/privacy-policy/mudita-center/")
  }

  public get termsConditionsLink() {
    return $("a=www.mudita.com/legal/terms-conditions/mudita-center/")
  }
}

export default new ModalTermsOfService()
