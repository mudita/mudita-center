/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { PrivacyPolicyComponentTestIds } from "./privacy-policy-ui.enum"
import {
  WindowContainer,
  WindowHeader,
  WindowTitle,
  LightText,
  LightTextNested,
} from "Renderer/modules/settings/tabs/about/components/shared"

const PrivacyPolicyUI: FunctionComponent = () => (
  <WindowContainer data-testid={PrivacyPolicyComponentTestIds.Wrapper}>
    <WindowHeader
      displayStyle={TextDisplayStyle.SecondaryHeading}
      data-testid={PrivacyPolicyComponentTestIds.Title}
    >
      Mudita Center Privacy Policy
    </WindowHeader>
    <WindowTitle displayStyle={TextDisplayStyle.MediumText}>
      Privacy policy - rules for the processing and protection of personal data
      in Mudita sp. z o.o.
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      For the purpose of the implementation of the requirements of Regulation
      (EU) 2016/679 of the European Parliament and of the Council of 27 April
      2016 on the protection of natural persons with regard to the processing of
      personal data and on the free movement of such data, and repealing
      Directive 95/46/EC (General Data Protection Regulation), hereinafter
      referred to as "GDPR", we inform you about the rules of processing your
      personal data and about your rights related with it.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      The following rules apply from June 22, 2021.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      1. <b>The controller of your personal data.</b> The controller of your
      personal data is <b>Mudita sp. z o.o.</b>, Jana Czeczota Street No. 9,
      02-607 Warsaw, Poland, REGON: 146767613, NIP (Tax No.): 5252558282,
      entered into the entrepreneur register of the National Court Register by
      the District Court for the Capital City of Warsaw, XII Commercial Division
      of the National Court Register (KRS) under No.: 0000467620, share capital
      (fully paid) PLN 20 000 (hereinafter referred to as "<b>We</b>”, "
      <b>Mudita</b>"). Mudita distributes a desktop application called Mudita
      Center (hereinafter “<b>Center</b>”).
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      2. <b>Contact details</b> Mudita has set one contact point for all
      personal data issues. If you would like to contact us, please write us an
      e-mail to: <a href={`mailto:office@mudita.com`}>office@mudita.com</a> or send a letter to: Mudita sp. z o.o., Jana
      Czeczota Street No. 9, 02-607 Warsaw with the note: "Personal data".
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      3. <b>Where do we obtain your personal data from?</b> Most of the data we
      receive directly from you. You provide us this data: a. By sending an
      e-mail or by contacting us through our profile on social networks, e.g.
      Facebook, Twitter, etc. b. During a conversation with the Mudita Staff c.
      By agreement for sending us data about errors that may occur while using
      Mudita Pure and Center.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      4. <b>What is the scope of data processed?</b> We process your personal
      database exclusively on your consent (basis of Art. 6 sec. 1 letter. a of
      the GDPR). With your permission, Mudita will gain access to information
      concerning the following errors (general errors, crash dumps, warnings, hard faults;
      Bluetooth data - state, signal power, controls state; VoLTE - network
      mode, on/off settings, phone call state; power management - average
      battery voltage level, minimal and maximal voltage, average current from
      the battery, state of charge; cellular - SIM slot selected, Mobile Network
      Code and Mobile Country Code) that may occur while using Mudita Pure and
      the Software. The aim of accessing such information is to fix errors and
      further develop the Mudita Pure device and the Software. Information
      accessed this way will be limited to diagnostic data, including the
      description of the error, type of operating system, version of the
      Software, and other technical data, as well as data containing the IP
      address of the computer that was used to check for updates for the
      Software or the Mudita Pure device. No other data will be accessed by
      Mudita in connection with your use of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      5. <b>How long do we process your personal data?</b> Until you revoke your
      consent, but no longer than 3 years.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      6. <b>Who is the recipient of your personal data?</b> We do not sell your
      data. We may share your personal data with our employees and associates if
      it is related to the aim described in point 4 above. Mudita holds all
      copyrights and licenses for the Software. Certain elements of the Software
      use or contain software provided by third parties as well as other
      copyrighted material, which you are entitled to use as part of the
      Software in accordance with these Terms. The Software may also use certain
      services provided by third parties. However, before accessing any service,
      you will be asked to give your permission and accept the terms defined by
      the service’s provider.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      7. <b>How do we process your personal data?</b> We process personal data
      in accordance with applicable law, in particular in accordance with GDPR.
      We have the following rules in mind when we process your personal
      information:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      a. <b>Adequacy rule.</b> We process only data that is necessary to achieve
      a given processing goal. We have carried out an analysis of the
      fulfillment of this rule for each business process;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      b. <b>Transparency rule.</b> You should have full knowledge of what is
      happening with your data. This document, in which we try to provide you
      with complete information about the rules of processing your personal data
      by us, is its manifestation;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      c. <b>Accuracy rule.</b> We strive to keep your personal data in our
      systems up-to-date and truthful. If you find that in some area your
      personal data have not been updated or are incorrect, please contact us at
      the email address <a href={`mailto:office@mudita.com`}>office@mudita.com</a>;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      d. <b>Integrity and confidentiality rule.</b> We apply the necessary
      measures to safeguard the confidentiality and integrity of your personal
      data. We are constantly improving them, along with the changing
      environment and technological progress. Security includes physical and
      technological measures restricting access to your data, as well as
      appropriate measures to prevent loss of your data;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      e. <b>Accountability rule.</b> We want to be able to account for each of
      our actions regarding personal data so that in the event of your inquiry
      we can give you full and reliable information about what actions we have
      been carried out on your data.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      8.{" "}
      <b>
        What rights do you have regarding the processing of your personal data?
      </b>{" "}
      The provisions of law give you a number of rights that you can use at any
      time. Unless you abuse these rights (e.g. unreasonable daily requests for
      information), exercising them will be free of charge and should be easy to
      implement. Your rights include:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      a. <b>The right to access your personal data.</b> This right means that
      you can ask us to export from our databases the information we have about
      you and send it to you in one of the commonly used formats (e.g. XLSX,
      DOCX, etc.);
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      b. <b>The right to correct personal data.</b> If you find out that the
      personal data we process is incorrect, you may ask us to correct it and we
      will be obliged to do so. In this case, we have the right to ask you for a
      document or proof of the change;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      c. <b>The right to seek restriction of personal data processing.</b> If
      despite the fact that we adhere to the adequacy principle, that is we
      process only data that is necessary to achieve a given processing goal,
      you consider that for a specific purpose we process too wide a catalog of
      your personal data, you have the right to request that we restrict (limit)
      the scope of processing. If the request does not oppose the requirements
      imposed on us by applicable law, or it is not necessary for the
      performance of the contract, we will accept your request;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      d. <b>The right to request the erasure of personal data.</b> This right,
      also known as the right to be forgotten, means that you can demand that we
      remove any information that contains your personal information from our
      systems and any other records. Remember, however, that we will not be able
      to do so if we are obliged to process your data under provisions of law
      (for example transaction documents for tax purposes, obligation to ensure
      the accountability of our activities). In each case, however, we will
      remove your personal data to the fullest extent possible, and where it is
      not possible, we will ensure their pseudonymization (which means that the
      data subject cannot be identified without a corresponding key). Allowing
      this, your data we need to keep in line with applicable law will be
      available only to a very limited group of people in our organization;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      e. <b>The right to personal data portability.</b> In accordance with the
      GDPR, you can ask us to port the data you provided to us in the course of
      all our contacts and all cooperation to a separate file, for the purpose
      of further transfer to another data controller;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      f. <b>The right to withdraw consent.</b> If we process your personal data
      on the basis of your consent, you can revoke this consent at any time.
      Withdrawal of your consent will not affect the lawfulness of the
      processing previously performed on the basis of the consent (prior to its
      withdrawal). However, we would like to inform you that your personal data
      in the scope of the purpose covered by the revoked consent will cease to
      be processed for this purpose only. Your personal data subject to consent
      will be further processed in order to fulfill our obligations under the
      law, including, in particular, the obligation to account for the
      correctness of personal data processing, or for the purposes based on our
      legitimate interest.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      Unless you abuse the rights listed above (e.g. unjustified daily requests
      for information), using them will be free of charge and should be easy to
      implement.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      You can perform the above-mentioned rights by contacting us at the e-mail
      address <a href={`mailto:office@mudita.com`}>office@mudita.com</a> or by post on <b>Mudita sp. z o.o.</b>, Jana
      Czeczota Street No. 9, 02-607 Warsaw, with the note "<b>Personal data</b>
      ".
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      In all matters related to personal data, you can always write to us,
      especially when any action or situation you encounter raises your concerns
      about its legality or if you feel that your rights or freedoms may be
      violated. In this case, we will answer your questions and concerns and
      immediately address the issue.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      If you believe that in any way we have violated the rules for the
      processing of your personal data, you have the right to submit a complaint
      directly to the supervisory authority (
      <b>
        from 22 June 2021, it is the President of the Office for Personal Data
        Protection in Poland
      </b>
      ). As part of exercising this right, you should provide a full description
      of the situation and indicate what action you consider as violating your
      rights or freedoms. The complaint should be submitted directly to the
      supervisory authority.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      9. <b>Is it your obligation to provide your data?</b> You provide your
      personal data voluntarily. There is no provision that would impose a legal
      obligation on you to provide it.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      However, if you want to use our services, you must provide data that will
      allow us to conclude the contract with you, to perform it, to fulfill our
      legal obligations regarding due tax settlement, and to prepare
      documentation for the purposes of accountability of our activities.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      Personal data provided for contact or marketing purposes is necessary for
      us to allow us to contact you or to carry out marketing activities that
      you agree to, or at least you do not oppose them. If we will be not
      provided with it, our communication with you will be either difficult
      (e.g. if you provide only your telephone number, but no e-mail address),
      or even impossible (if no contact details will be provided).
    </LightText>
  </WindowContainer>
)

export default PrivacyPolicyUI
