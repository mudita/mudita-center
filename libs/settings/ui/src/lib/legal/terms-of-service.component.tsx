/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { LegalArticle } from "../settings/legal-ui.styled"
import { EXTERNAL_URLS } from "../settings/settings.constants"
import { TermsOfServiceComponentTestIds } from "settings/models"
import { Typography } from "app-theme/ui"

export const TermsOfService: FunctionComponent = () => (
  <LegalArticle data-testid={TermsOfServiceComponentTestIds.Wrapper}>
    <Typography.H3 data-testid={TermsOfServiceComponentTestIds.Title}>
      Mudita Center Terms of Service
    </Typography.H3>
    <Typography.P3>Version dated: 14.03.2025</Typography.P3>
    <Typography.P3>
      The User should carefully review this document. It includes in particular
      the terms of use for Mudita Center, licences, Updates, the choice of
      governing law, and liability rules. However, no provisions of this
      document affect Consumer protection rights granted under mandatory legal
      regulations. To learn more about your rights, we recommend contacting a
      local Consumer protection organization.
    </Typography.P3>
    <ol>
      <li>
        <Typography.P3>DEFINITIONS</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              For the purposes of the Terms of Service, the following
              definitions shall apply:
            </Typography.P3>
            <ol className={"lettered"}>
              <li>
                <Typography.P3>
                  <strong>Consumer</strong> - A User who is a natural person
                  entering into a contract or other legal transaction with
                  Mudita that is not directly related to their business or
                  professional activity.
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  <strong>Content</strong> - All content, in particular textual,
                  graphic, or multimedia elements (e.g., information about
                  Mudita Center, services, visualizations, images, descriptions
                  of the Mudita), as well as images of natural persons, that are
                  published and distributed within Mudita Center by the Mudita.
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  <strong>Minor</strong> - A natural person who does not have
                  full legal capacity or a natural person with an equivalent
                  status under the laws applicable in their place of residence.
                  In particular, Minors are considered to be individuals who
                  have not reached the age of 18, subject to the preceding
                  sentence.
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  <strong>Mudita</strong> - Mudita sp. z o.o. with its
                  registered office in Warsaw (02-607), Jana Czeczota 6 street,
                  entered into the register of entrepreneurs of the National
                  Court Register kept by the District Court for the Capital City
                  of Warsaw, 13th Commercial Division of the National Court
                  Register, entry no. 0000467620, Tax Identification Number:
                  5252558282 and Statistical Identification Number: 146767613,
                  the share capital of PLN: 1,040,000.00.
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  <strong>Mudita Center</strong> - A software, along with all
                  Content and Updates, as well as the accompanying
                  documentation, provided by Mudita and distributed under the
                  name &quot;Mudita Center&quot;, which the User may install on
                  their end device upon meeting the conditions specified in the
                  Terms of Service, including the Technical Requirements.
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  <strong>Open Source Licences</strong> - Separate licenses for
                  software components used to create Mudita Center that are
                  granted to the User outside the scope of the Terms of Service.
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  <strong>Technical Requirements</strong> - The minimum
                  technical requirements necessary for installing and using
                  Mudita Center are as follows: computer or other end device
                  connected to the Internet with a minimum bandwidth allowing
                  the download of Mudita Center, and with an installed operating
                  system: macOS Big Sur 11 and up (236 MB HDD space), Windows 10
                  or later (258 MB HDD space), 64-bit Ubuntu 18.04+ (102 MB HDD
                  space).
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  <strong>Terms of Service</strong> - The present Terms of
                  Service available at:{" "}
                  <a
                    href={EXTERNAL_URLS.termsAndConditions}
                    rel="noreferrer"
                    target="_blank"
                  >
                    https://www.mudita.com/legal/terms-conditions/mudita-center/
                  </a>
                  , constituting an agreement between the User and Mudita.
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  <strong>Updates</strong> - Any modified version of Mudita
                  Center provided by Mudita. In particular, an Update may
                  include upgrades, enhancements, add-ons, and other
                  modifications to Mudita Center, including bug fixes, updates,
                  the addition of new services, as well as functional
                  improvements and refinements.
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  <strong>User</strong> - You – the person using Mudita Center.
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  <strong>Website</strong> -{" "}
                  <a
                    href={EXTERNAL_URLS.website}
                    rel="noreferrer"
                    target="_blank"
                  >
                    https://www.mudita.com/
                  </a>
                </Typography.P3>
              </li>
            </ol>
          </li>
        </ol>
      </li>
      <li>
        <Typography.P3>GENERAL PROVISIONS</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              The Terms of Service specify the rules for using Mudita Center.
              Acceptance of the Terms of Service is voluntary, but necessary for
              the User to install and use Mudita Center on their end device. The
              Terms of Service also apply to any Updates, unless these Updates
              are governed by another document or agreement, in which case the
              provisions of that document or agreement will apply.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Minors with limited legal capacity are required to review the
              Terms of Service with a parent or other legal representative, who
              must provide valid consent for the minor to use Mudita Center.
              Mudita has the right to verify that the appropriate consent has
              been obtained by the User. Minors who do not have full or limited
              legal capacity are not allowed to use Mudita Center.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              No provisions of this document affect Consumer protection rights
              granted under mandatory legal regulations. To learn more about
              your rights, we recommend contacting a local consumer protection
              organization.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              In matters related to the operation of the Mudita Center, Users
              may contact Mudita by sending an email to the following email
              address: <a href={`mailto:hello@mudita.com`}>hello@mudita.com</a>{" "}
              or calling the phone number +48 22 3433783
            </Typography.P3>
          </li>
        </ol>
      </li>
      <li>
        <Typography.P3>SERVICES / MUDITA CENTER FEATURES</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              Mudita provides through Mudita Center, electronic services such as
              providing information about Mudita&apos;s products and services,
              as well as enabling Users to manage Mudita devices, including but
              not limited to updating them, importing or exporting data and
              backups.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              The scope of available services varies depending on the
              User&apos;s device type and model (e.g. Pure, Harmony, Kompakt).
              Detailed information on supported devices and available features
              can be found in Mudita Center or on the Website.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              To start using Mudita Center, the User must download the
              appropriate installation file for their operating system type and
              version from the Website and complete the installation process.
              Alternatively.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Installing and use of Mudita Center requires the User to accept
              the Terms of Service. The agreement for the provision of
              electronic services via Mudita Center between the User and Mudita
              is concluded at the moment of the successful installation of
              Mudita Center on the User's end device.
            </Typography.P3>
          </li>
        </ol>
      </li>
      <li>
        <Typography.P3>INTELLECTUAL PROPERTY / LICENSE</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              All rights, including exclusive rights, to Mudita Center and its
              Content – particularly graphic elements, logos, names, source
              code, and database rights – are legally protected and belong to
              Mudita.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              The User acknowledges that the use of Mudita Center and its
              Content is strictly for personal use and may not be used
              commercially. Content also may not be distributed. Any use of
              Mudita Center for purposes related to scientific research,
              analysis, or evaluation of Mudita Center is prohibited without the
              express prior written consent of Mudita.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Mudita grants the User a non-exclusive, personal,
              non-transferable, and limited license to download and install
              Mudita Center on the User&apos;s end device and to use a single
              copy of Mudita Center under the terms set forth in Terms of
              Service.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Among the components of Mudita Center, there may be elements
              subject to separate open-source software licenses with the User,
              which specifically include licenses approved by the Open Source
              Initiative or other similar licenses.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              The granting of an Open Source License to the User is independent
              of the Terms of Service and is based on separate license
              agreements with the User. The applicable provisions of Open Source
              Licenses are made available to the User in the Third-Party
              Licenses document, accessible within Mudita Center. To the extent
              that specific Open Source Licenses prohibit the usage restrictions
              indicated in these Terms of Service, the provisions of the Open
              Source Licenses shall prevail over its provisions. The User
              acknowledges that Open Source Licenses may be subject to changes
              in licensing terms independently of Mudita.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              For the avoidance of doubt, Mudita reserves all rights not
              expressly granted to the User under the Terms of Service. Mudita
              Center is protected under applicable law, particularly copyright
              law, intellectual property law, and international treaties,
              including but not limited to the Agreement on Trade-Related
              Aspects of Intellectual Property Rights (TRIPS). This license is
              subject to the limitations set forth in the Terms of Service.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              The transfer of the license granted under the Terms of Service to
              third parties by the User is only possible if the ownership of the
              User's end device, along with the installed Mudita Center, is
              transferred. Before starting to use Mudita Center, the acquiring
              User must accept the Terms of Service in the same manner as the
              transferring User.
            </Typography.P3>
          </li>
        </ol>
      </li>
      <li>
        <Typography.P3>UPDATES</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              Mudita may allow the User to download and install Updates. Mudita
              will notify (within Mudita Center and Website) the User of any
              available Updates, including those related to security, which are
              necessary to ensure that Mudita Center remains in compliance with
              the Terms of Service. The User acknowledges that some Updates,
              particularly those concerning security and resolving security
              issues reported to Mudita, are crucial for the proper functioning
              of Mudita Center.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              If the User does not install the provided Updates, including those
              related to security, necessary to maintain Mudita Center&apos;s
              compliance with the Terms of Service and services provided through
              it, Mudita will not be responsible for any lack of compliance with
              Mudita Center and the services provided, resulting solely from the
              failure to install such Updates, provided that:
            </Typography.P3>
            <ol>
              <li>
                <Typography.P3>
                  The User has been informed about the need for an update and
                  the consequences of not installing it;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  The failure to install or improper installation of the Update
                  was not due to errors in the provided installation
                  instructions.
                </Typography.P3>
              </li>
            </ol>
          </li>
          <li>
            <Typography.P3>
              All components of the Updates are subject to the Terms of Service,
              unless additional provisions are included through the Update. In
              the case of an Update requiring a change to the Terms of Service,
              the provisions of section 12 shall apply until the modified
              version of the Terms of Service comes into effect. The User cannot
              install the Update without prior acceptance of the Terms of
              Service if such updates have been introduced.
            </Typography.P3>
          </li>
        </ol>
      </li>
      <li>
        <Typography.P3>HEALTH DISCLAIMER</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              The User acknowledge and agree that Mudita Center and the services
              provided through it are not intended or designed to prevent, treat
              or diagnose any condition, illness or disease, nor Mudita Center
              and the services provided through it should be considered, in
              whole or in part, express or implied to contain or constitute
              medical or psychological advice.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Any advice or other materials contained in the Mudita Center and
              the services provided through it are intended for general
              information purposes only. Mudita makes no guarantees that the
              Mudita Center and the services provided through it provide a
              physical, mental or therapeutic health benefit and does not
              purport to give medical advice. The Mudita Center and the services
              provided through it are not a substitute for professional medical
              or psychological advice or treatment based on your personal
              circumstances. The User should seek the advice of your medical
              physician, doctor or other qualified health care provider if you
              have any concerns that using the Mudita Center and the services
              provided through it will detrimentally impact their physical or
              mental health and well-being. You acknowledge that Mudita has
              advised you of the necessity of doing so.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Actions or omissions based on this content may also cause damage
              to the extent that the content may not take into account the
              specific, individual circumstances of a given case, and therefore
              are not recommended without consulting a licensed professional who
              will take such circumstances into account.
            </Typography.P3>
          </li>
        </ol>
      </li>
      <li>
        <Typography.P3>USER OBLIGATIONS</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              The User may not (except for cases in which it is expressly
              permitted by the generally applicable laws, by Mudita, or an
              open-source license covering the source code of Mudita Center):
            </Typography.P3>
            <ol>
              <li>
                <Typography.P3>
                  copy, publish, adapt, reproduce, decompile, disassemble, or
                  attempt in any way to determine the source code or any other
                  element of Mudita Center;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  modify, disable, or bypass any features of Mudita Center, any
                  security mechanisms, or create derivative works based on
                  Mudita Center;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  share, distribute, lease, rent, sublicense, or sell Mudita
                  Center;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  allow or enable other persons to perform any of the above
                  actions – this also applies to any elements of Mudita Center.
                </Typography.P3>
              </li>
            </ol>
          </li>
          <li>
            <Typography.P3>
              The User is particularly obligated to:
            </Typography.P3>
            <ol>
              <li>
                <Typography.P3>
                  use Mudita Center in a manner that does not disrupt
                  Mudita&apos;s operations or the functioning of Mudita Center,
                  in compliance with applicable law, the provisions of the Terms
                  of Service, as well as accepted customs and principles of
                  social coexistence;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  not provide or transmit any content through Mudita Center that
                  is prohibited by applicable law, especially content that
                  infringes third-party copyrights or personal rights;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  not engage in IT activities or any other actions aimed at
                  obtaining information not intended for the User or interfering
                  with the rules or technical aspects of Mudita Center's
                  functioning;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  not modify Content provided by Mudita through Mudita Center in
                  an unauthorized manner;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  provide only true, up-to-date, and necessary User data within
                  Mudita Center, and promptly update such data, including
                  personal data, provided to Mudita in connection with the
                  conclusion of the agreement (if applicable).
                </Typography.P3>
              </li>
            </ol>
          </li>
          <li>
            <Typography.P3>
              The User are strongly advised not to use Mudita Center and the
              services provided through it while operating heavy machinery,
              driving, flying or performing any activity or task that, with due
              regard to the safety of yourself and others, requires your
              attention and concentration.
            </Typography.P3>
          </li>
        </ol>
      </li>
      <li>
        <Typography.P3>LIABILITY</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              None of the provisions of this section are intended to limit or
              exclude any mandatory rights granted to Users, particularly those
              who are Consumers, and any potential doubts shall be resolved in
              favor of the User. If any exclusions or limitations are found to
              be inadmissible, they shall be deemed reserved to the maximum
              extent permissible under applicable law.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              The entire Mudita Center is provided to the User AS &quot;IS&quot;
              and &quot;AS AVAILABLE&quot;. In particular, to the fullest extent
              permitted by applicable law, Mudita does not provide any express
              or implied warranties for Mudita Center, nor shall the provision
              of any information or guidance regarding the use of Mudita Center
              be considered as such a warranty.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Mudita&apos;s liability towards Users who are not Consumers for
              warranty claims in connection with the performance of the Terms of
              Service is excluded. Furthermore, to the fullest extent permitted
              by applicable law, Mudita excludes its liability towards the User
              for any damages, including lost profits or failure to fulfill its
              obligations due to force majeure, resulting from the Terms of
              Service.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              The User acknowledges that the use of Mudita Center is at their
              own risk and responsibility. Mudita&apos;s liability for damages,
              whether directly or indirectly arising from the use or inability
              to use Mudita Center, including but not limited to personal
              injury, data loss, lost profits, costs of substitute equipment or
              software, is excluded to the fullest extent permitted by
              applicable law.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Notwithstanding the above, to the fullest extent permitted by
              applicable law, Mudita's liability for damages arising directly or
              indirectly from the use or inability to use the Mudita Center,
              regardless of the legal basis, shall not exceed 50€.
            </Typography.P3>
          </li>
        </ol>
      </li>
      <li>
        <Typography.P3>TERMINATION OF THE TERMS OF SERVICE</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              This agreement (Terms of Service) is concluded for an indefinite
              period, having regard to the provisions of this section 9.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              The User may terminate the Terms of Service with immediate effect
              at any time by ceasing to use Mudita Center and uninstalling it
              from the end device.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              The Terms of Service may also be terminated as a result of the
              sale of the User&apos;s end device on which Mudita Center is
              installed. In such a case, the moment of termination of the Terms
              of Service is considered to be the moment when the purchaser of
              such a device accepts the Terms of Service.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Mudita may terminate the Terms of Service with immediate effect if
              the User has violated the Terms of Service or any other provisions
              binding the User and Mudita regarding Mudita Center. In the event
              of termination of the Terms of Service by Mudita, the User must
              immediately and completely cease using Mudita Center and uninstall
              it from their end device.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Mudita is entitled to decide on the complete discontinuation of
              Mudita Center (cessation of operations related to providing access
              to Mudita Center). In such a case, the User will be informed of
              the decision at least 6 months before the planned discontinuation
              date (notice period) via a notification displayed within Mudita
              Center, or an email sent to the User&apos;s email address, and on
              the Website. After the expiration of the notice period, the
              agreements regarding Mudita Center concluded between the User and
              the Provider will be terminated.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Mudita may terminate the Terms of Service in the event of the
              circumstances specified in pt. 12.1, with a 14-day notice period.
              A termination notice on this basis will be provided to the User
              within Mudita Center or via an email sent to Users. In that case,
              depending on the circumstances User may need to discontinue the
              use of Mudita Center and uninstall it from the User&apos;s end
              device
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              All provisions contained in the Terms of Service that should
              remain in force due to their nature shall continue to be valid and
              binding, regardless of the method of termination of the Terms of
              Service.
            </Typography.P3>
          </li>
        </ol>
      </li>
      <li>
        <Typography.P3>COMPLAINTS</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              Complaints regarding issues related to Mudita Center and the
              services provided through it, as covered by the Terms of Service,
              may be submitted in particular via email to{" "}
              <a href={`mailto:hello@mudita.com`}>hello@mudita.com</a> or by
              mail to the following address: ul. Jana Czeczota 6, 02-607 Warsaw,
              Poland.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              To expedite the complaint resolution process, the complaint should
              include, in particular:
            </Typography.P3>
            <ol>
              <li>
                <Typography.P3>
                  information on the current Mudita Center version;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  the technical specifications of the device on which Mudita
                  Center is installed,
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  the model of the device managed via Mudita Center (if
                  applicable);
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  contact details (including, if applicable the User&apos;s
                  e-mail address used for downloading Mudita Center);
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>a description of the issue.</Typography.P3>
              </li>
            </ol>
          </li>
          <li>
            <Typography.P3>
              Complaints will be processed within 14 days from the date of
              receipt by Mudita. If Mudita is unable to process the complaint
              due to missing necessary information, the User will be informed
              about the missing details. The response to the complaint will be
              sent to the email address provided in the complaint unless the
              User requests to receive the response via traditional mail to the
              specified address.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              In the event of any non-compliance of Mudita Center, including the
              services provided through it, with the agreement, the User is
              obliged to cooperate with Mudita to a reasonable extent in order
              to determine – using the least burdensome technical means for the
              User –whether the non-compliance of Mudita Center, including the
              services provided through it, results from the characteristics of
              the User&apos;s digital environment.
            </Typography.P3>
          </li>
        </ol>
      </li>
      <li>
        <Typography.P3>DISPUTE RESOLUTION</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              In the event of any disputes arising directly or indirectly from
              the Terms of Service, they may first be resolved amicably,
              including through Mudita's complaint procedure, if applicable. For
              Consumers, additional methods specified below may also be
              available.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              The use of out-of-court methods for handling complaints and
              pursuing claims is voluntary. The following provisions are for
              informational purposes only and do not constitute an obligation
              for Mudita to participate in out-of-court dispute resolution
              procedures. Mudita's statement regarding consent or refusal to
              participate in a consumer dispute resolution procedure will be
              provided in writing or on another durable medium if a dispute
              remains unresolved following a Consumer's complaint.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              The rules governing out-of-court consumer dispute resolution
              procedures and the obligations of businesses in this regard are
              separately defined in applicable laws. Detailed information on the
              Consumer's ability to use out-of-court complaint handling and
              dispute resolution methods, as well as access to such procedures,
              may be available at the offices and on the websites of relevant
              consumer protection authorities.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              A Consumer who is a permanent resident of the EU, Norway, Iceland,
              or Liechtenstein may submit a complaint via the online ODR
              platform:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                rel="noreferrer"
                target="_blank"
              >
                https://ec.europa.eu/consumers/odr/
              </a>{" "}
              (the ability to submit complaints will expire on 20 March 2025,
              and the ODR platform will be discontinued on 20 July 2025).
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Any disputes arising from the Terms of Service shall be subject to
              the jurisdiction of the national courts of Poland or the EU Member
              State where the user resides, unless mandatory provisions of law
              state otherwise.
            </Typography.P3>
          </li>
        </ol>
      </li>
      <li>
        <Typography.P3>AMENDMENTS</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              Terms of Service may be amended by Mudita if at least one of the
              following important reasons occurs:
            </Typography.P3>
            <ol>
              <li>
                <Typography.P3>
                  a change in legal regulations governing functioning of Mudita
                  Center and the provision of services through it, as covered by
                  Terms of Service, affecting the mutual rights and obligations
                  of the User and Mudita, or a change in the interpretation of
                  these legal regulations as a result of court rulings,
                  decisions, recommendations, or guidelines issued by the
                  relevant authorities;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  a change in the method of functioning of Mudita Center and the
                  provision of services through it, as covered by Terms of
                  Service due to technical or technological reasons;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  a modification of the scope or method of functioning of Mudita
                  Center and the provision of services through it, as covered by
                  Terms of Service, particularly through the introduction of new
                  functionalities, modification, or withdrawal of existing
                  functionalities or services by Mudita;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  a modification of the scope or method of service provision by
                  entities cooperating with Mudita, involving the introduction
                  of new functionalities, modification, or withdrawal of
                  existing functionalities or services by these entities,
                  impacting the mutual rights and obligations between the User
                  and Mudita.
                </Typography.P3>
              </li>
            </ol>
          </li>
          <li>
            <Typography.P3>
              Amendments to the Terms of Service shall take effect after a
              14-day notice period granted to the User, unless the User actively
              accepts the amended Terms of Service earlier, or a shorter period
              is required by mandatory legal regulations or decisions of
              competent authorities or courts.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              The active acceptance of the amended Terms of Service, as well as
              the continued use of Mudita Center, after the amended Terms of
              Service comes into effect, shall constitute acceptance of the
              introduced changes. If the User does not wish to accept the
              modified Terms of Service, depending on the circumstances they may
              need to discontinue the use of Mudita Center and uninstall it from
              the User's end device.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Mudita reserves the right to make changes to the operation of
              Mudita Center, including the services provided through it, that
              are not necessary to maintain compliance with the agreement and do
              not lead to its modification (pt. 12.1.), when such changes result
              from:
            </Typography.P3>
            <ol>
              <li>
                <Typography.P3>
                  improvement or modification of existing functionalities,
                  enhancement of Mudita Center's performance, including the
                  services provided through it, in particular through changes to
                  the layout, design, modification of content, and the removal
                  of selected elements;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  editorial changes necessary to correct or eliminate errors;
                </Typography.P3>
              </li>
              <li>
                <Typography.P3>
                  security improvements that do not impact compliance with the
                  agreement, including, in particular, patching exploits and
                  bugs.
                </Typography.P3>
              </li>
            </ol>
          </li>
          <li>
            <Typography.P3>
              Mudita will inform Users of the changes referred to in section 12
              within Mudita Center or via an email sent to Users, as well as on
              the Website.
            </Typography.P3>
          </li>
        </ol>
      </li>
      <li>
        <Typography.P3>APPLICABLE LAW / LANGUAGE VERSIONS</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              Terms of Service are governed by Polish law and shall be
              interpreted in accordance with it, regardless of any applicable
              conflict-of-laws rules, except in cases where mandatory provisions
              of the User&apos;s jurisdiction provide otherwise.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              The parties expressly exclude the application of the provisions of
              the Convention on Contracts for the International Sale of Goods to
              these Terms of Service.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              The translation has been made in accordance with national
              requirements, and in the event of any discrepancies between the
              English version and the translated version, the English version
              shall prevail, to the extent that such is not prohibited by
              mandatory legal provisions in the User&apos;s jurisdiction.
            </Typography.P3>
          </li>
        </ol>
      </li>
      <li>
        <Typography.P3>FINAL PROVISIONS</Typography.P3>
        <ol>
          <li>
            <Typography.P3>
              Terms of Service constitute the entire agreement between the User
              and Mudita regarding Mudita Center, unless expressly stated
              otherwise in the Terms of Service.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              If any provision of these Terms of Service is found to be invalid
              or unenforceable, it shall not affect the validity or
              enforceability of the remaining provisions.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Using Mudita Center may involve the processing of the User&apos;s
              personal data. Detailed information on personal data processing
              can be found in the Privacy Policy.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Mudita Center may contain links to websites or other resources of
              third-party entities. Mudita is not responsible for the content on
              such websites or resources, nor for any actions taken by the User
              in connection with the use of services, goods, or content
              available on such third-party websites.
            </Typography.P3>
          </li>
          <li>
            <Typography.P3>
              Services provided through Mudita Center are electronic services
              and, as such, involve typical risks associated with data
              transmission over the Internet, such as the disclosure of User
              data, unauthorized access, or data loss. Both parties are
              obligated to take measures to minimize these risks – Mudita, in
              particular, by implementing appropriate technical and
              organizational safeguards, and the User by exercising due care,
              maintaining data confidentiality, and not sharing it with
              unauthorized persons.
            </Typography.P3>
          </li>
        </ol>
      </li>
    </ol>
  </LegalArticle>
)
