/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalTermsOfService extends Page {
  public get modalHeader() {
    return $("//*[@data-testid='terms-of-service-component-title']")
  }

  public get sectionGeneralProvisions() {
    return $("//p[text()='2. GENERAL PROVISIONS']")
  }

  public get sectionServices() {
    return $("//p[text()='3. SERVICES / MUDITA CENTER FEATURES']")
  }

  public get sectionIntellectualProperty() {
    return $("//p[text()='4. INTELLECTUAL PROPERTY / LICENSE']")
  }

  public get sectionUpdates() {
    return $("//p[text()='5. UPDATES']")
  }

  public get sectionHealthDisclaimer() {
    return $("//p[text()='6. HEALTH DISCLAIMER']")
  }

  public get sectionUserObligations() {
    return $("//p[text()='7. USER OBLIGATIONS']")
  }

  public get sectionLiability() {
    return $("//p[text()='8. LIABILITY']")
  }

  public get sectionTerminationOfTheTerms() {
    return $("//p[text()='9. TERMINATION OF THE TERMS OF SERVICE']")
  }

  public get sectionComplaints() {
    return $("//p[text()='10. COMPLAINTS']")
  }

  public get sectionDisputeResolution() {
    return $("//p[text()='11. DISPUTE RESOLUTION']")
  }

  public get sectionAmendments() {
    return $("//p[text()='12. AMENDMENTS']")
  }

  public get sectinonApplicableLaw() {
    return $("//p[text()='13. APPLICABLE LAW / LANGUAGE VERSIONS']")
  }

  public get sectionFinalProvisions() {
    return $("//p[text()='14. FINAL PROVISIONS']")
  }

  public get companyWebsiteLink() {
    return $("//a[contains(text(), 'https://www.mudita.com/')]")
  }

  public get companyEmailLink() {
    return $("//a[contains(text(), 'hello@mudita.com')]")
  }

  public get privacyPolicyLink() {
    return $(
      "//a[contains(text(), 'www.mudita.com/legal/privacy-policy/mudita-center/')]"
    )
  }

  public get termsConditionsLink() {
    return $(
      "//a[contains(text(), 'https://www.mudita.com/legal/terms-conditions/mudita-center/')]"
    )
  }
}

export default new ModalTermsOfService()
