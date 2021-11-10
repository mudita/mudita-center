/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { TermsOfServiceComponentTestIds } from "./terms-of-service-ui.enum"
import {
  WindowContainer,
  WindowHeader,
  WindowTitle,
  LightText,
  LightTextNested,
} from "Renderer/modules/settings/tabs/about/components/shared"
import { EXTERNAL_URLS } from "App/renderer/constants/external-urls"

const TermsOfServiceUI: FunctionComponent = () => (
  <WindowContainer data-testid={TermsOfServiceComponentTestIds.Wrapper}>
    <WindowHeader
      displayStyle={TextDisplayStyle.SecondaryHeading}
      data-testid={TermsOfServiceComponentTestIds.Title}
    >
      Mudita Center Terms of Use
    </WindowHeader>
    <WindowTitle displayStyle={TextDisplayStyle.MediumText}>
      GENERAL PROVISIONS
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      1. Mudita sp. z o.o has implemented the Terms and Conditions with its
      registered office in Warsaw (02-607), ul. Jana Czeczota 6, entered into
      the register of entrepreneurs of the National Court Register kept by the
      District Court for the Capital City of Warsaw, 13th Commercial Division of
      the National Court Register, entry no. 0000467620, Tax Identification
      Number: 5252558282 and Statistical Identification Number: 14676767613, the
      share capital of PLN 21,100.00 (hereinafter referred to as Mudita).
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      2. The Terms and Conditions specify the rules of using the Mudita Center
      desktop application (hereinafter named as “The App”). To use the App it is
      required to accept all provisions of the Terms and Conditions. By starting
      to use any functionality of the App the User agrees to all its Terms and
      Conditions, thus undertaking to abide by them.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      3. In general, in matters related to the operation of The App, Users may
      contact Mudita by sending an email to the following e-mail address:{" "}
      <a href={`mailto:hello@mudita.com`}>hello@mudita.com</a>.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      4. The user's full use of the App and its functionalities requires access
      to the computer operating on macOS, Windows, or Linux.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      5. Capitalized words from Terms and Conditions are defined as follows:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      a. <b>The App</b> - the Mudita Center desktop device application for the
      macOS, Windows, or Linux operating system.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      b. <b>Mudita</b> - the Mudita sp. z o.o. company, as specified in point
      1.1.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      c. <b>Privacy Policy</b> – terms and conditions defining the rules of
      processing personal data of the User by Mudita Center, available under the
      address:{" "}
      <a href={EXTERNAL_URLS.privacyPolicy} rel="noreferrer" target="_blank">
        www.mudita.com/legal/privacy-policy/mudita-center/
      </a>
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      d. <b>Terms and Conditions</b> – the present Terms and Conditions
      available at:{" "}
      <a
        href={EXTERNAL_URLS.termsAndConditions}
        rel="noreferrer"
        target="_blank"
      >
        www.mudita.com/legal/terms-conditions/mudita-center/
      </a>
      . Terms and Conditions also constitute the terms and conditions for the
      provision of electronic services, referred to in Article 8(1)(1) of the
      Polish Act on Electronic Provision of Services of 18 July 2002 (Journal of
      Laws of 2019, item 123);
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      e. <b>Website</b> – the website available at{" "}
      <a href={`https://www.mudita.com`} rel="noreferrer" target="_blank">
        www.mudita.com
      </a>
      , owned and administered by Mudita;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      f. <b>User</b> – a natural person using The App and/or services provided
      through The App.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      g. <b>Device</b> - device which is used to access the App including but
      not limited to computers.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      h. <b>Intellectual Property Rights</b> - means any and all intellectual
      property rights existing in any part of the world under applicable law,
      including without limitation patent law, copyright law, trade secret law,
      trademark law, unfair competition law, and any and all applications,
      renewals, extensions and restorations of such rights, now or hereafter in
      effect worldwide.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      i. <b>Content</b> - refers to any and all Mudita and third-party editorial
      content, information, text, images, photos, videos, artwork,
      illustrations, graphic (art and electronic) images, audio, music, sounds,
      postings, messages, recommendations, comments, software, files, feedback,
      bug reports, or other protected materials and authored works of any kind
      that are utilized in the provision of the Services.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      j. <b>App Distributor</b> - refers to Mudita’s website (
      <a href={`https://www.mudita.com`} rel="noreferrer" target="_blank">
        www.mudita.com
      </a>
      ) where the App is made available.
    </LightTextNested>
    <WindowTitle displayStyle={TextDisplayStyle.MediumText}>
      PURPOSE AND USE OF THE APP
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      1. The App allows Mudita to expand and update the features of Mudita Pure,
      and Mudita Harmony while using a computer (“The Services”).
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      2. The App is a source of information about Mudita's products, services
      offered by Mudita, and its strategy and philosophy.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      3. In order to start using the service, users must first: download and
      install the app from our website (
      <a href={`https://www.mudita.com`} rel="noreferrer" target="_blank">
        Mudita
      </a>
      )
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      4. Personal data of the User obtained by Mudita through The App shall be
      processed for the purposes and in accordance with the Privacy Policy.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.MediumText}>
      Intellectual Property Rights, License, and Ownership
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      1. You acknowledge and agree that the Services are made available to you
      for your own personal and non-commercial purposes only.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      2. You understand that in agreeing to and complying with these Terms and
      our Privacy Policy, Mudita grants you a non-exclusive, revocable,
      non-transferable, non-sublicensable, and limited license to view and
      listen to the Content by You and install a copy of the Mudita App on a
      Device that you own or control.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      3. Mudita reserves all rights in and to the Services and the Content not
      expressly granted to you under these Terms.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.MediumText}>
      Restrictions
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      In acknowledgment of Mudita’s ownership of and Intellectual Property
      Rights in the Services and Content, you agree that you will not:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      - have rights to use the Software and/or Updates for purposes other than
      those specified in the License contained in the App.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      - modify, translate, disassemble, decompile, or reproduce the Software in
      whole or in part (except for cases in which it is expressly permitted by
      the generally applicable laws or an open-source license covering the
      source code of the Software).
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      - use the Software on devices whose malfunction or misuse may cause death,
      injury, major physical harm, or major environmental damage.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      Mudita will enforce its Intellectual Property Rights to the fullest extent
      of the law, including but not limited to bringing civil or criminal legal
      proceedings.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.MediumText}>
      RESPONSIBILITY
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      1. Mudita shall take every effort to ensure the continued operation of The
      App to the best of its ability. However, Mudita reserves the right to
      interrupt the operation of The App, in particular in connection with
      technical work on the Service, or possible breakdowns. You acknowledge
      this and you shall not file any claims against Mudita in this respect.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      2. Mudita informs that, should the equipment or network used by the User
      fail to meet the requirements of the Terms and Conditions, as well as
      other problems or technical limitations arise from the use of such
      equipment or network, they may limit or prevent the User's access to The
      App or adversely affect the quality and continuity of providing services
      by means of The App.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      3. Mudita shall not be responsible for improper operation of The App or
      provision of services contrary to the Terms of Conditions resulting from
      reasons beyond Mudita's control (e.g. force majeure or actions of third
      parties not acting on behalf of or on behalf of Mudita) and from the
      User's use of The App or services in a manner inconsistent with the Terms
      and Conditions.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      4. Mudita reserves the right at any time to change, modify or discontinue
      the Services and Content, in whole or in part, with or without notice to
      you. You acknowledge this and you shall not file any claims against Mudita
      in this respect.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      5. Any breach of these Terms may result in, among other things, immediate
      termination or suspension of your rights and license to access and use
      Mudita’s Services and Content, as well as the deactivation of your
      account, if applicable.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      6. Mudita reserves the right, in our sole discretion, to bring legal
      proceedings against you and any third party, if applicable, if you breach
      these Terms and/or you are engaged in the illegal or fraudulent use of the
      Services or Content.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.MediumText}>
      Health Disclaimer
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      1. You acknowledge and agree that Mudita’s Services are not intended or
      designed to prevent, treat or diagnose any condition, illness or disease,
      nor should Mudita’s Services be considered, in whole or in part, express
      or implied to contain or constitute medical or psychological advice.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      2. Any advice or other materials contained in the Services are intended
      for general information purposes only. Mudita makes no guarantees that the
      Services provide a physical, mental or therapeutic health benefit and does
      not purport to give medical advice. The Services are not a substitute for
      professional medical or psychological advice or treatment based on your
      personal circumstances. You should seek the advice of your medical
      physician, doctor or other qualified health care provider if you have any
      concerns that using the Services will detrimentally impact your physical
      or mental health and well-being. You acknowledge that Mudita has advised
      you of the necessity of doing so.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      3. Actions or omissions based on this content may also cause damage to the
      extent that the content may not take into account the specific, individual
      circumstances of a given case, and therefore are not recommended without
      consulting a licensed professional who will take such circumstances into
      account.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.MediumText}>
      CONDITIONS OF USE
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      1. If you choose to access or use the Site, App, Services or Content in
      any jurisdiction, you are responsible for compliance with the applicable
      local laws relating to the use of or otherwise connected with the Site,
      App, Services and Content in that jurisdiction. To the extent that the
      Site, App, Services and Content would infringe the laws of the
      jurisdiction from which you are accessing them, you are prohibited from
      accessing or using the same. This provision shall apply notwithstanding
      any other provision of the Terms.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      2. You agree not to use the Services for any purposes related to
      scientific research, analysis or evaluation of the Services without the
      express prior written consent of Mudita.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      3. You are strongly advised not to use the Services while operating heavy
      machinery, driving, flying or performing any activity or task that, with
      due regard to the safety of yourself and others, requires your attention
      and concentration.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.MediumText}>
      COMMUNICATION AND FEEDBACK
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      1. The User has the right to provide written feedback (“Feedback”)
      regarding the functioning of The App.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      2. Feedback should be submitted electronically to the following e-mail
      address: <a href={`mailto:hello@mudita.com`}>hello@mudita.com</a>
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      3. The Feedback should consist of at least the following information:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      a. User's e-mail address used for downloading the App through the App
      Distributor
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      b. description of the subject matter of the feedback;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
      c. a proposal on how to resolve the problem.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      4. If the information and data provided in the Feedback are insufficient,
      Mudita shall immediately call upon the User to supplement them, and the
      deadline for Mudita to consider the Feedback shall run from the date of
      correct supplementation of such data and information by the User.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      5. Mudita shall respond to the User's Feedback and shall contact the User
      with regard to the Feedback writing to the User's e-mail address used for
      initially submitting the Feedback to Mudita.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      6. The response to the Feedback is the final outcome of the internal
      Feedback procedure.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.MediumText}>
      FINAL PROVISIONS
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      1. To the extent not regulated by these Terms and Conditions provisions of
      the Polish law shall apply, however, as far as consumers are concerned,
      this does not deprive them of the protection granted by the law of the
      country of their habitual residence, which cannot be excluded under the
      contract, if the provisions in force in such a country are more favorable
      to the consumer than the provisions in force in the Republic of Poland.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
      2. For important reasons (such as e.g. a change in the law or a change in
      the functionality of The App or Mudita activity) Mudita is entitled to
      amend the content of the Terms and Conditions at any time. Information
      about the change and the amended content of the Terms and Conditions shall
      be published within the App i.e. it will be displayed automatically after
      turning on the App at least 7 days before the changes of Terms and
      Conditions come into effect. The new content of the Regulations will be
      available each time in the appropriate tab of The App and on the Website{" "}
      <a
        href={EXTERNAL_URLS.termsAndConditions}
        rel="noreferrer"
        target="_blank"
      >
        www.mudita.com/legal/terms-conditions/mudita-center/
      </a>
      . If you do not uninstall the App, even though you have received notice of
      an amendment to these Terms and Conditions, you are deemed to accept the
      amended content of the Terms and Conditions.
    </LightText>
  </WindowContainer>
)

export default TermsOfServiceUI
