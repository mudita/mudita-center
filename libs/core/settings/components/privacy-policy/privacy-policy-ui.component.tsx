/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
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
      We hereby inform that we process your personal data. Details regarding
      this can be found below.
    </LightText>
    <BoldText displayStyle={TextDisplayStyle.Paragraph4}>
      Who is the controller of your personal data and who can you contact about
      it?
    </BoldText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      1. The Controller of your personal data is <b>Mudita sp. z o.o.</b> with
      its registered office in Warsaw at ul. Jana Czeczota 6, 02-607 Warsaw,
      entered into the Register of Entrepreneurs held by the Regional Court for
      the Capital City of Warsaw, 12th Commercial Division of the National Court
      Register, under KRS [National Court Register Number] 0000467620, NIP
      [Polish Taxpayer Identification Number] 5252558282, REGON [National
      Business Registration Number] 146767613, share capital:600.000,00 zł.,
      hereinafter referred to as “<b>Controller or Mudita</b>”.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      2. In cases regarding the protection of your personal data and the
      exercising your rights you can contact us by e-mail: office@mudita.com or
      in writing to our address indicated in clause 1.
    </LightText>
    <BoldText displayStyle={TextDisplayStyle.Paragraph4}>
      For what purposes and on what grounds do we process your personal data?
    </BoldText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      3. Your personal data is processed for the following purposes:
    </LightText>
    <GridWrapper>
      <GridBoldItem displayStyle={TextDisplayStyle.Paragraph4}>
        the purpose of the processing
      </GridBoldItem>
      <GridBoldItem displayStyle={TextDisplayStyle.Paragraph4}>
        legal basis for the processing
      </GridBoldItem>
      <GridBoldItem displayStyle={TextDisplayStyle.Paragraph4}>
        Mudita&apos;s software users
      </GridBoldItem>
      <GridBoldItem displayStyle={TextDisplayStyle.Paragraph4}></GridBoldItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        sharing and enabling the use of the offered software
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        indispensability to perform the agreement
        <br />
        <br />
        (Article 6 (1) (b) of the GDPR)
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        analyze of data provided
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        your consent
        <br />
        <br />
        (Article 6 (1) (a) of the GDPR)
      </GridItem>
      <GridBoldItem displayStyle={TextDisplayStyle.Paragraph4}>
        Mudita&apos;s website and forum users
      </GridBoldItem>
      <GridBoldItem displayStyle={TextDisplayStyle.Paragraph4}></GridBoldItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        necessary cookies
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        our legitimate interest
        <br />
        <br />
        (Article 6 (1) (f) of the GDPR)
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        marketing, functional, analytical cookies or our partners cookies
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        your consent
        <br />
        <br />
        (Article 6 (1) (a) of the GDPR)
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        transferring marketing and promotional information including our
        partners
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        your consent
        <br />
        <br />
        (Article 6 (1) (a) of the GDPR)
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        performance of the agreement concluded with us (forum users)
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        indispensability to perform the agreement
        <br />
        <br />
        (Article 6 (1) (b) of the GDPR)
      </GridItem>
      <GridBoldItem displayStyle={TextDisplayStyle.Paragraph4}>
        sales
      </GridBoldItem>
      <GridBoldItem displayStyle={TextDisplayStyle.Paragraph4}></GridBoldItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        leading to the conclusion of the agreement with us
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        indispensability to perform the agreement
        <br />
        <br />
        (Article 6 (1) (b) of the GDPR)
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        performance of the agreement concluded with us and handling complaints
        concerning the agreements concluded with us
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        indispensability to perform the agreement
        <br />
        <br />
        (Article 6 (1) (b) of the GDPR)
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        performance of additional services
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        our legitimate interest
        <br />
        <br />
        (Article 6 (1) (f) of the GDPR)
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        transferring marketing and promotional information including our
        partners
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        our legitimate interest
        <br />
        <br />
        (Article 6 (1) (f) of the GDPR)
        <br />
        <br /> or your consent
        <br />
        <br />
        (Article 6 (1) (a) of the GDPR)
      </GridItem>
      <GridBoldItem displayStyle={TextDisplayStyle.Paragraph4}>
        questions for us
      </GridBoldItem>
      <GridBoldItem displayStyle={TextDisplayStyle.Paragraph4}></GridBoldItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        responding to the questions sent via: contact form, forum, email or
        phone number
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        our legitimate interest
        <br />
        <br />
        (Article 6 (1) (f) of the GDPR)
      </GridItem>
      <GridBoldItem displayStyle={TextDisplayStyle.Paragraph4}>
        general
      </GridBoldItem>
      <GridBoldItem displayStyle={TextDisplayStyle.Paragraph4}></GridBoldItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        analytical purposes (e.g. selection of the services to the needs of our
        clients, optimization of our products / services based on your comments
        on this topic, optimalization of the service processes based on the
        process of sales service and after-sales service, including complaint,
        clients&apos; satisfaction survey and determining of the quality of our
        service)
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        our legitimate interest
        <br />
        <br />
        (Article 6 (1) (f) of the GDPR)
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        possible establishment, investigation or defence against claims (i.e.
        evidence purposes)
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        our legitimate interest
        <br />
        <br />
        (Article 6 (1) (f) of the GDPR)
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        storage of accounting documents
      </GridItem>
      <GridItem displayStyle={TextDisplayStyle.Paragraph4}>
        our obligation to keep accounting documents under tax law
        <br />
        <br />
        (Article 6 (1) (c) of the GDPR in conjunction with Article 86 § 1 of the
        Tax Ordinance Act)
      </GridItem>
    </GridWrapper>
    <BoldText displayStyle={TextDisplayStyle.Paragraph4}>
      Who has access to your personal data?
    </BoldText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      4. We may share your personal data with the following categories of
      entities:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      a) employees and associates,
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      b) related undertakings and cooperating entities, including our partners,
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      c) entities supporting our activity, including but not limited to legal,
      accounting, IT, logistics, marketing terms, etc.
    </LightTextNested>
    <BoldText displayStyle={TextDisplayStyle.Paragraph4}>
      How long is your personal data stored?
    </BoldText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      5. Your personal data is processed:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      a) in relation to conclusion and performance of the agreement or providing
      other services (using Mudita’s website/forum, software users, products
      sales, necessary cookies) - for the time necessary to perform the
      contract;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      b) provided under your consent (cookies files or marketing data) - unless
      you withdraw your consent or further processing will be pointless;
      contract;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      c) related to answering to your inquiries - for the time necessary to
      perform the obligation and for the time necessary to achieve our goals;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      d) for evidence purposes to establish the existence of claims, their
      pursuit or defence against them - until the end of the limitation period
      for possible claims in this respect (this period is determined by the
      provisions of the Polish Civil Code), and in the case of its use in public
      legal proceedings until the time when after their final termination,
      extraordinary appeal measures are not be applicable any more (such period
      shall be determined by the provisions of the Polish Code of Civil
      Procedure);
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      e) in connection with the storage of accounting documentation - until the
      expiry of the limitation period for the tax obligation related to the
      relevant transaction (this period is determined by the provisions of the
      Tax Ordinance Act);
    </LightTextNested>
    <BoldText displayStyle={TextDisplayStyle.Paragraph4}>
      What rights do you have in relation to the processing of your personal
      data?
    </BoldText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      6. You shall have the right:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      a) to access to your data and receive a copy of it;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      b) to rectify (correct) your data;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      c) to delete data: if, in your opinion, there are no grounds for us to
      process your data, you can request us to delete it;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      d) to limit data processing: you can request that we limit the processing
      of your personal data only to their storage or performance of the
      activities agreed with you, if in your opinion we have incorrect data
      about you or we process it unreasonably; or you do not want us to delete
      it because you need it to establish, pursue or defend claims; or for the
      duration of your objection to data processing;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      e) to object to the processing of data: objection due to special situation
      - you shall have the right to object to the processing of your data on the
      basis of a legitimate interest for purposes other than direct marketing,
      as well as when the processing is necessary for us to fulfil a task
      carried out in the public interest or the exercising public authority
      entrusted to us, then you should indicate your special situation, which,
      in your opinion, justifies the our discontinuation of the processing
      covered by the objection, we will stop processing your data for such
      purposes, unless we demonstrate that the grounds for processing your data
      override your rights or that your data is necessary for us to establish,
      pursue or defend claims;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      f) to transfer data;
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      g) to lodge a complaint with the supervisory authority: if you think that
      we process your data unlawfully, you can lodge a complaint to the
      supervisory authority responsible for overseeing compliance with the
      provisions on the protection of personal data (the President of the Office
      for Personal Data Protection);
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      h) to withdraw your consent to the processing of personal data: at any
      time you shall have the right to withdraw your consent to the processing
      of your personal data, which we process on the basis of your consent, the
      withdrawal of consent will not influence the legal compliance of the
      processing which was performed on the basis of your consent before its
      withdrawal.
    </LightTextNested>
    <BoldText displayStyle={TextDisplayStyle.Paragraph4}>
      How to exercise your personal data rights?
    </BoldText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      7. In order to exercise your rights, send a request to the contact details
      indicated in clause 1. Before exercising your rights you shall remember
      that we will have to make sure it is you, that is, to appropriately
      identify you.
    </LightText>
    <BoldText displayStyle={TextDisplayStyle.Paragraph4}>
      Is providing personal data mandatory?
    </BoldText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      8. Concluding the agreement with us is voluntary. However, providing
      personal data in connection with the agreement is a condition for its
      conclusion and then performance - without providing your personal data, it
      is not possible to conclude the agreement with us.
    </LightText>
    <BoldText displayStyle={TextDisplayStyle.Paragraph4}>Cookies</BoldText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      9. Cookies are tiny text files that are downloaded to your computer, to
      improve your experience during using our website. They serve also many
      functions. They are very important for the proper operation of most
      websites, including those where we log in to our account. These files
      identify the computer and the user, they are not malicious programs or
      associated with any private data.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      We use cookies to improve your experience while you navigate through the
      our websites accordingly to our cookies policy. Out of these cookies, the
      cookies that are categorized as necessary are stored on your browser as
      they as essential for the working of basic functionalities of the our
      websites.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      We also use marketing, functional, analytical or third-party cookies that
      help us analyze and understand how you use our websites, to store user
      preferences and provide them with content and advertisements that are
      relevant to you. These cookies will only be stored on your browser with
      your consent to do so. You also have the option to opt-out of these
      cookies. But opting out of some of these cookies may have an effect on
      your browsing experience.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      You can express your consent or objection to the use of cookies after
      entering our website. Before granting your consent, you can read the full
      list and details about cookies that we use on our website.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Details about settings the rules for the use of cookies, including
      disabling cookies, by the browser are available at the links below:
    </LightText>
    <ul>
      <li>
        <LightText displayStyle={TextDisplayStyle.Paragraph4}>
          Internet Explorer:{" "}
          <a
            href={`https://support.microsoft.com/pl-pl/help/17442/windows-internet-explorer-delete-manage-cookies`}
          >
            https://support.microsoft.com/pl-pl/help/17442/windows-internet-explorer-delete-manage-cookies
          </a>
        </LightText>
      </li>
      <li>
        <LightText displayStyle={TextDisplayStyle.Paragraph4}>
          Mozilla Firefox:{" "}
          <a href={`http://support.mozilla.org/pl/kb/ciasteczka`}>
            http://support.mozilla.org/pl/kb/ciasteczka
          </a>
        </LightText>
      </li>
      <li>
        <LightText displayStyle={TextDisplayStyle.Paragraph4}>
          Google Chrome:{" "}
          <a
            href={`http://support.google.com/chrome/bin/answer.py?hl=pl&answer=95647`}
          >
            http://support.google.com/chrome/bin/answer.py?hl=pl&answer=95647
          </a>
        </LightText>
      </li>
      <li>
        <LightText displayStyle={TextDisplayStyle.Paragraph4}>
          Opera:{" "}
          <a href={`http://help.opera.com/Windows/12.10/pl/cookies.html`}>
            http://help.opera.com/Windows/12.10/pl/cookies.html
          </a>
        </LightText>
      </li>
      <li>
        <LightText displayStyle={TextDisplayStyle.Paragraph4}>
          Safari:{" "}
          <a href={`https://support.apple.com/kb/PH5042?locale=en-GB`}>
            https://support.apple.com/kb/PH5042?locale=en-GB
          </a>
        </LightText>
      </li>
    </ul>
    <BoldText displayStyle={TextDisplayStyle.Paragraph4}>
      Additional information
    </BoldText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      10. Controller does not share and has no intention to share client&apos;s
      personal data with third country or international organisation. Only
      except may be the United States (based on standard contractual clauses
      according to Commission Implementing Decision (EU) 2021/914 of 4 June 2021
      on standard contractual clauses for the transfer of personal data to third
      countries pursuant to Regulation (EU) 2016/679 of the European Parliament
      and of the Council), which results from the fact, that personal data may
      be uploaded to the servers of applications, software and IT services
      providers, located in the United States.
    </LightText>
  </WindowContainer>
)
