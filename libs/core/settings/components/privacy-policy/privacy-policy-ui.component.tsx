/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import { PrivacyPolicyComponentTestIds } from "./privacy-policy-ui.enum"
import {
  WindowContainer,
  WindowHeader,
  LightText,
  LightTextNested,
  BoldText,
  GridWrapper,
  GridItem,
  GridBoldItem,
  WindowTitle,
} from "Core/settings/components/about/shared"

export const PrivacyPolicyUI: FunctionComponent = () => (
  <WindowContainer data-testid={PrivacyPolicyComponentTestIds.Wrapper}>
    <WindowHeader
      displayStyle={TextDisplayStyle.Headline2}
      data-testid={PrivacyPolicyComponentTestIds.Title}
    >
      Mudita Center Privacy Policy
    </WindowHeader>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      This document explains in particular what personal data we collect, how we
      use it, and what rights you have regarding its processing. Our goal is to
      ensure transparency and clarity on privacy matters so that you can feel
      safe while using our products and software along with all content,
      updates, related documentation, provided by Mudita and distributed under
      the name "Mudita Center" (hereinafter: <b>"Mudita Center”</b>).
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      We make every effort to minimize the collection of personal data. Whenever
      possible and economically justified, we use technologies that do not
      require us to store user information. However, if data collection is
      necessary for the proper functioning of our products and services, we do
      so in compliance with applicable regulations (e.g. Regulation (EU)
      2016/679 - General Data Protection Regulation / <b>“GDPR”</b>), with a
      valid legal basis, and in accordance with industry best practices for
      privacy protection.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      We encourage you to review this Privacy Policy and contact us if you have
      any questions or concerns.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      1. ABOUT DOCUMENT
    </WindowTitle>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      Please note that this Privacy Policy applies only to the processing of
      personal data related to the use of the Mudita Center.{" "}
      <b>
        It does not cover the processing of personal data related to your use of
        Mudita devices
      </b>
      (e.g., Pure, Kompakt, Harmony). Information in this regard is available
      within the legal documents of the respective product (e.g. “About Phone”
      tab”).
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      Providing personal data is voluntary but necessary to fulfill the purposes
      outlined in section 4 below.
    </LightTextNested>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      2. DATA CONTROLLER
    </WindowTitle>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      The controller of personal data processed in connection with your use of
      the Mudita Center is Mudita sp. z o.o. with its registered office in
      Warsaw (02-607), Jana Czeczota 6 street, KRS no: 0000467620, Tax
      Identification Number: 5252558282 (hereinafter: <b>"Mudita"</b> or{" "}
      <b>"We"</b>).
    </LightTextNested>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      3. CONTACT
    </WindowTitle>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      If you have any questions regarding the processing of your personal data,
      you can contact Mudita via email at office@mudita.com or by writing to the
      address specified in section 2 above.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      We strive to respond promptly to every message. However, in more complex
      cases, the process may take longer. Additionally, Mudita may request
      further information to properly verify your identity, provide a
      comprehensive response, or, in special situations, inform you that more
      time is needed to address your inquiry.
    </LightTextNested>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      4. PURPOSES AND LEGAL BASIS FOR THE PROCESSING OF YOUR PERSONAL DATA /
      RETENTION PERIOD
    </WindowTitle>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      4.1. <b>Proper Functioning of the Mudita Center / Services</b>
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      <b>[Purpose]</b> In order to properly provide electronic services
      (functioning of Mudita Center and provide services through it), including
      in particular technical support and bug fixes, informing you about
      available software updates, and processing statutory claims, we may
      process your personal data.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      <b>[Categories of Data]</b> In such cases, Mudita may process, in
      particular, data contained in system logs, the IMEI number, the device's
      serial number, and other identifiers specific to the software /
      application, network, or device (e.g., device ID).
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      <b>[Legal Basis / Retention Period]</b> The processing of data is
      necessary to take action at your request before entering into a contract
      or for its performance (Article 6(1)(b) of the GDPR) and to fulfill our
      legitimate interests, particularly in continuously improving our products
      and services (Article 6(1)(f) of the GDPR). Mudita may process this data
      for the period necessary to achieve the above-mentioned purposes, and in
      particular, this period will not exceed the duration of the use (and
      installation) of the Mudita Center in the case of the legal basis under
      Article 6(1)(b) of the GDPR. In the case of the legal basis under Article
      6(1)(f), the processing will continue until the legitimate interest no
      longer exists or until an effective objection is raised.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      4.2. <b>Fraud Prevention / Claim Pursuit / Defending against claims </b>
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      <b>[Purpose]</b> We strive to detect and prevent fraud, unauthorized use
      of our software / application (Mudita Center), violations of our rights,
      etc., as well as handle any reports regarding legal violations.
      Additionally, we may take actions related to asserting and pursuing claims
      or defending against claims brought against Mudita.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      <b>[Categories of Data]</b> To effectively achieve these purposes, we may
      process personal data, including, in particular, data contained in system
      logs, the IMEI number, the device's serial number, and other identifiers
      specific to the software / application, network, or device (e.g., device
      ID).
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      <b>[Legal Basis / Retention Period]</b> The processing of data for the
      above purposes is necessary to pursue Mudita's legitimate interest in
      asserting or defending legal claims, as well as preventing fraud and
      misuse (Article 6(1)(f) of the GDPR). Mudita may process the data for the
      period necessary to achieve these purposes, particularly for the duration
      of the limitation periods for claims applicable to or against Mudita, as
      provided by law.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      4.3. <b>Contact</b>
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      <b>[Purpose]</b> In case of any inquiries regarding Mudita Center, you
      have the option to contact Mudita. In such situations, the personal data
      of the user initiating contact may be processed.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      <b>[Categories of Data]</b> In such cases, Mudita may process the user's
      contact details and any other personal data provided by the user during
      the communication.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      <b>[Legal Basis / Retention Period]</b> The legal basis for processing
      your personal data for this purpose is the Controller's legitimate
      interest – Article 6(1)(f) of the GDPR. Personal data will be processed
      for the period necessary to review your inquiry and provide a response.
    </LightTextNested>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      5. DATA RECIPIENTS
    </WindowTitle>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      Your personal data may be shared or entrusted by Mudita to third parties
      to the extent necessary to achieve the intended purposes. The recipients
      of personal data may include, in particular: <b>(i)</b> entities
      affiliated with us, <b>(ii)</b> IT services and support providers{" "}
      <b>(iii)</b> professional advisors, such as lawyers, auditors,
      accountants, and <b>(iv)</b> other entities cooperating with Mudita, if
      justified or necessary for the purposes of data processing.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      Mudita may also share your personal data to local or foreign public
      administration authorities and law enforcement agencies if required by
      law. These authorities may be located both in your country of residence
      and abroad.
    </LightTextNested>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      6. AUTOMATED INDIVIDUAL DECISION-MAKING / PROFILING
    </WindowTitle>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      No decisions based on automated processing of personal data, including
      profiling, will be made concerning you.
    </LightTextNested>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      7. RIGHTS OF THE DATA SUBJECTS
    </WindowTitle>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      In connection with the processing of your personal data, you have the
      following rights under applicable laws:
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      a. The right to access your data, including obtaining a copy of your data,
      <br />
      b. The right to request rectification of your data,
      <br />
      c. The right to restrict the processing of your data,
      <br />
      d. The right to request the deletion of your data (in certain situations),
      <br />
      e. The right to data portability for data you have provided and that is
      processed automatically based on your consent or a contract, e.g., to
      another controller,
      <br />
      f. The right to object to the processing of personal data – to the extent
      that processing is based on the legitimate interest of the controller or a
      third party.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      If your data is processed based on consent, you have the right to withdraw
      your consent to the extent that the data is processed on this basis. The
      withdrawal of consent does not affect the lawfulness of processing carried
      out before its withdrawal.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      The scope of each of these rights and the situations in which they can be
      exercised are determined by legal regulations. The specific right you may
      exercise will depend, among other factors, on the purpose and legal basis
      of the data processing. To exercise the above rights, you should contact
      Mudita in the manner specified in section 3. We will respond to your
      inquiries within the timeframes provided by applicable law.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      If you have concerns about how Mudita processes your personal data, you
      may file a complaint with the appropriate data protection authority. A
      list of such authorities is available at this link. The jurisdiction of
      authorities is governed by the applicable law.
    </LightTextNested>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      8. TRANSFER OF PERSONAL DATA TO THIRD COUNTRIES
    </WindowTitle>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      Your personal data will generally be processed within the EEA. However,
      data may be transferred to Mudita's partners who process it outside the
      EEA, but only to the extent necessary for Mudita’s cooperation with these
      partners.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      In such cases, Mudita takes all possible measures to ensure the security
      of the transferred personal data, including, in particular, transferring
      personal data to countries that the European Commission has determined, by
      decision, to provide an adequate level of protection. In the absence of
      such a decision, Mudita ensures the security of personal data through
      safeguards such as the standard contractual clauses approved by the
      European Commission.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      For more information about the applied safeguards, including obtaining a
      copy of them, you may contact Mudita using the methods indicated in
      section 3 above.
    </LightTextNested>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      9. OTHER INFORMATIONS ABOUR YOUR PRIVACY / BACKUP / MANAGE MUDITA DEVICE
    </WindowTitle>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      The data stored on your device that is backed up using Mudita Center
      (e.g., contact list, call log, messages, alarms, notes, etc.) is not
      processed by us, and the backup is performed locally on the device where
      Mudita Center is installed. Similarly, when using other features of Mudita
      Center designed to manage your Mudita device (e.g., editing contacts,
      managing sounds, etc.), Mudita does not process this data.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      In connection with your use of Mudita Center, besides the data specified
      in section 4, we may process also other information (e.g., summary records
      of Mudita Center or Mudita device updates).{" "}
      <b>
        However, this data is collected in a way that prevents the
        identification of specific users
      </b>{" "}
      (which means that these are not personal data),{" "}
      <b>including through data aggregation.</b>
    </LightTextNested>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      10. FINAL PROVISIONS
    </WindowTitle>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      This version of the Privacy Policy is effective as of 14.03.2025.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      In connection with the Mudita’s development and application updates,
      Mudita reserves the right to amend this Privacy Policy.
    </LightTextNested>
  </WindowContainer>
)
