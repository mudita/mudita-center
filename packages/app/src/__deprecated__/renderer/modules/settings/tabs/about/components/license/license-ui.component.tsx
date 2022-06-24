/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { LicenseComponentTestIds } from "./license-ui.enum"
import {
  WindowContainer,
  WindowHeader,
  WindowTitle,
  LightText,
  LightTextNested,
  NoteText,
} from "App/__deprecated__/renderer/modules/settings/tabs/about/components/shared"

export const LicenseUI: FunctionComponent = () => (
  <WindowContainer data-testid={LicenseComponentTestIds.Wrapper}>
    <WindowHeader
      displayStyle={TextDisplayStyle.Headline2}
      data-testid={LicenseComponentTestIds.Title}
    >
      Mudita Center Software – Terms of Use
    </WindowHeader>
    <NoteText displayStyle={TextDisplayStyle.Paragraph4}>
      NOTE: BY USING THE MUDITA CENTER SOFTWARE, YOU AGREE TO COMPLY WITH THE
      TERMS LISTED BELOW. WITHOUT ACCEPTING THEM, YOU WILL NOT ACQUIRE THE RIGHT
      TO USE THE SOFTWARE. THEREFORE, YOU SHOULD READ THESE TERMS THOROUGHLY
      BEFORE INSTALLING MUDITA CENTER. IF YOU DO NOT AGREE WITH THESE TERMS, YOU
      CANNOT OBTAIN AND USE THE SOFTWARE OR DOWNLOAD OR USE ITS UPDATES.
    </NoteText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Definitions:
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      "Software" refers to the Mudita Center computer application available on
      computers, used primarily for managing the Mudita Pure and Mudita Harmony.
      As of the publication date of these Terms, the application can be
      installed on the macOS, Windows, and Linux operating systems. The features
      offered by the Software and its compatibility with computer systems are
      subject to change with subsequent Updates, e.g., they can be limited or
      expanded.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      "Update" refers to any update to the Software, including the addition or
      changing of features or replacing the Software with a new application.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      "Mudita" refers to Mudita sp. z o.o. with its registered office in Warsaw
      (address: Jana Czeczota 6, 02- 607 Warsaw, Poland), entered into the
      Register of Entrepreneurs of the National Court Register under KRS number
      0000467620, tax identification number (NIP) 5252558282, share capital PLN
      21,100.00.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      "User" (also referred to as "you") refers to any person who has accepted
      the Terms of Use for the Mudita Center Software and installed the
      Software.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      License terms:
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      - Upon your acceptance of these Terms, Mudita will grant you a free
      license to use the Software. When you download an Update, you will
      similarly acquire a free license to use the Update. This license grants
      you a non-exclusive, territorially unlimited right to use the Software
      and/or Updates without limitation to the number of copies installed on
      computers, provided that you are entitled to use those computers and
      install software on them. The license includes:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      {"  "} - storing the Software and/or Updates using the computer’s disk
      space or on data storage devices,
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      {"  "} - running, displaying, and using the Software and/or Updates on the
      computer in accordance with their intended purpose.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      - This license does not grant you any rights to use the Software and/or
      Updates for purposes other than those specified in these Terms.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      - You may not modify, translate, disassemble, decompile, or reproduce the
      Software in whole or in part (except for cases in which it is expressly
      permitted by the generally applicable laws or an open- source license
      covering the source code of the Software).
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      - You may not use the Software on devices whose malfunction or misuse may
      cause death, injury, major physical harm, or major environmental damage.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      - The license shall remain effective until terminated. However, if you
      violate these Terms in any way, you shall lose the rights to use the
      Software. Upon losing such rights, you should stop using the Software and
      destroy any remaining copies.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Transfer of data:
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      With your permission, Mudita will gain access to information concerning
      the following errors (general errors, crash dumps, warnings, hard faults;
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
      address of the computer that was used to check for Updates for the
      Software or the Mudita Pure device. No other data will be accessed by
      Mudita in connection with your use of the Software.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Limitation of liability:
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      To the maximum extent permitted by the generally applicable laws that
      apply to the User, Mudita shall not be liable for any losses related to
      the use of the Software, with the exception of situations resulting from
      willful misconduct or gross negligence by Mudita.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Copyright / Third-party services:
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Mudita holds all copyrights and licenses for the Software. Certain
      elements of the Software use or contain software provided by third parties
      as well as other copyrighted material, which you are entitled to use as
      part of the Software in accordance with these Terms. The Software may also
      use certain services provided by third parties. However, before accessing
      any service, you will be asked to give your permission and accept the
      terms defined by the service’s provider.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Amendments to the Terms:
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Mudita reserves the right to amend these Terms under justified
      circumstances (such as changes to the applicable law, the Software’s
      functionality, or the nature of Mudita’s business). The updated Terms will
      always be available in the corresponding tab of the Software as well as on
      the Mudita website. Choosing not to uninstall the Software upon receiving
      information about amendments to the Terms will be deemed to constitute
      acceptance of the changes.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Applicable law:
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The agreement entered into by accepting these Terms is governed by the
      laws of the Republic of Poland. However, it does not deprive the consumer
      of protection granted by the legal regulations of their country of
      habitual residence that cannot be derogated from by agreement if the
      regulations applicable in that country are more beneficial to the consumer
      than the regulations of the Republic of Poland.
    </LightText>
  </WindowContainer>
)
