/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalPrivacyPolicy extends Page {
  public get modalHeader() {
    return $("//*[@data-testid='privacy-policy-component-title']")
  }

  public get firstPoint() {
    return $("//p[contains(text(), 'The controller of personal data')]")
  }

  public get sectionAboutDocument() {
    return $("//p[text()='1. ABOUT DOCUMENT']")
  }

  public get sectionDataController() {
    return $("//p[text()='2. DATA CONTROLLER']")
  }

  public get sectionContact() {
    return $("//p[text()='3. CONTACT']")
  }

  public get sectionPurposesAndLegalBasis() {
    return $(
      "//p[text()='4. PURPOSES AND LEGAL BASIS FOR THE PROCESSING OF YOUR PERSONAL DATA / RETENTION PERIOD']"
    )
  }

  public get sectionDataRecipients() {
    return $("//p[text()='5. DATA RECIPIENTS']")
  }

  public get sectionAutomatedIndividual() {
    return $(
      "//p[text()='6. AUTOMATED INDIVIDUAL DECISION-MAKING / PROFILING']"
    )
  }

  public get sectionRightsOfTheData() {
    return $("//p[text()='7. RIGHTS OF THE DATA SUBJECTS']")
  }

  public get sectionTransferOfPersonalData() {
    return $("//p[text()='8. TRANSFER OF PERSONAL DATA TO THIRD COUNTRIES']")
  }

  public get sectionOtherInformations() {
    return $(
      "//p[contains(text(), '9. OTHER INFORMATIONS ABOUR YOUR PRIVACY')]"
    )
  }

  public get sectionFinalProvisions() {
    return $("//p[text()='10. FINAL PROVISIONS']")
  }

  public get privacyPolicyVersion() {
    return $(
      "//p[contains(text(), 'This version of the Privacy Policy is effective as of 14.03.2025.')]"
    )
  }

  public get rightsToAmendPrivacyPolicy() {
    return $(
      "//p[contains(text(), 'In connection with the Mudita’s development and application updates')]"
    )
  }
}

export default new ModalPrivacyPolicy()
