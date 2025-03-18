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
    return $("p=2. GENERAL PROVISIONS")
  }

  public get sectionServices() {
    return $("p=3. SERVICES / MUDITA CENTER FEATURES")
  }

  public get sectionIntellectualProperty() {
    return $("p=4. INTELLECTUAL PROPERTY / LICENSE")
  }

  public get sectionUpdates() {
    return $("p=5. UPDATES")
  }

  public get sectionHealthDisclaimer() {
    return $("p=6. HEALTH DISCLAIMER")
  }

  public get sectionUserObligations() {
    return $("p=7. USER OBLIGATIONS")
  }

  public get sectionLiability() {
    return $("p=8. LIABILITY")
  }

  public get sectionTerminationOfTheTerms() {
    return $("p=9. TERMINATION OF THE TERMS OF SERVICE")
  }

  public get sectionComplaints() {
    return $("p=10. COMPLAINTS")
  }

  public get sectionDisputeResolution() {
    return $("p=11. DISPUTE RESOLUTION")
  }

  public get sectionAmendments() {
    return $("p=12. AMENDMENTS")
  }

  public get sectinonApplicableLaw() {
    return $("p=13. APPLICABLE LAW / LANGUAGE VERSIONS")
  }

  public get sectionFinalProvisions() {
    return $("p=14. FINAL PROVISIONS")
  }

  public get companyWebsiteLink() {
    return $("a=https://www.mudita.com/")
  }

  public get companyEmailLink() {
    return $("a=hello@mudita.com")
  }

  public get privacyPolicyLink() {
    return $("a=www.mudita.com/legal/privacy-policy/mudita-center/")
  }

  public get termsConditionsLink() {
    return $("a=https://www.mudita.com/legal/terms-conditions/mudita-center/")
  }
}

export default new ModalTermsOfService()
