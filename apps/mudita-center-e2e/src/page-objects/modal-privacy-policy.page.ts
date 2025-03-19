/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalPrivacyPolicy extends Page {
  public get modalHeader() {
    return $('[data-testid="privacy-policy-component-title"]')
  }

  public get firstPoint() {
    return $("p*=The controller of personal data")
  }

  public get sectionAboutDocument() {
    return $("p=1. ABOUT DOCUMENT")
  }

  public get sectionDataController() {
    return $("p=2. DATA CONTROLLER")
  }

  public get sectionContact() {
    return $("p=3. CONTACT")
  }

  public get sectionPurposesAndLegalBasis() {
    return $(
      "p=4. PURPOSES AND LEGAL BASIS FOR THE PROCESSING OF YOUR PERSONAL DATA / RETENTION PERIOD"
    )
  }

  public get sectionDataRecipients() {
    return $("p=5. DATA RECIPIENTS")
  }

  public get sectionAutomatedIndividual() {
    return $("p=6. AUTOMATED INDIVIDUAL DECISION-MAKING / PROFILING")
  }

  public get sectionRightsOfTheData() {
    return $("p=7. RIGHTS OF THE DATA SUBJECTS")
  }

  public get sectionTransferOfPersonalData() {
    return $("p=8. TRANSFER OF PERSONAL DATA TO THIRD COUNTRIES")
  }

  public get sectionOtherInformations() {
    return $(
      "p=9. OTHER INFORMATIONS ABOUR YOUR PRIVACY / BACKUP / MANAGE MUDITA DEVICE"
    )
  }

  public get sectionFinalProvisions() {
    return $("p=10. FINAL PROVISIONS")
  }

  public get privacyPolicyVersion() {
    return $(
      "p=This version of the Privacy Policy is effective as of 14.03.2025."
    )
  }

  public get rightsToAmendPrivacyPolicy() {
    return $(
      "p=In connection with the Mudita’s development and application updates,"
    )
  }
}

export default new ModalPrivacyPolicy()
