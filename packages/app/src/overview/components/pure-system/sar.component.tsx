/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  WindowContainer,
  LightText,
  LightTextNested,
  WindowHeader,
} from "App/settings/components/about/shared"
import { PureSystemTestIds } from "App/overview/components/pure-system//pure-system-test-ids.enum"

const SarComponent: FunctionComponent = () => (
  <WindowContainer data-testid={PureSystemTestIds.SarWrapper}>
    <WindowHeader displayStyle={TextDisplayStyle.Headline3}>SAR</WindowHeader>
    <LightText
      displayStyle={TextDisplayStyle.Paragraph4}
      data-testid={PureSystemTestIds.SarParagraph}
    >
      THE EQUIPMENT MEETS INTERNATIONAL REQUIREMENTS FOR EXPOSURE TO RADIO
      WAVES. The mobile phone is a radio frequency receiver/transmitter.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Mudita Pure has been designed to minimize exposure to radio waves (radio
      frequency electromagnetic fields) as defined by international guidelines,
      while maintaining signal integrity. These guidelines have been developed
      by an independent scientific institution (ICNIRP) and provide a basic
      safety margin to ensure the safety of all users regardless of age or
      health.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Exposure to radio waves is expressed in a rate called Specific Absorption
      Rate (SAR).
      <br />
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The maximum SAR value for Mudita Pure:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      <strong>1.6 W/kg (over 1 g) SAR Limit</strong> American Standard ANSI
      C95.1 (ANSI 1992)
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      Head: 0.07
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      Body: 1.13
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      <strong>2.0 W/kg (over 10 g) SAR Limit</strong> ICNIRP Guidelines 1998
      (ICNIRP 1998)
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      Head: 0.06
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      Body: 0.62
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      During use, the actual SAR values for this device are significantly lower
      than those given above, because the power consumption of the mobile phone
      is automatically reduced if full power is not required to make a call, due
      to system performance and minimized network interference. The lower the
      power consumption of this device, the lower the SAR value
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Our solution uses 2 antennas with dedicated shielding and specially
      written software to minimize exposure to radio waves.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The antennas switch to the one with better parameters to minimize SAR, but
      also to keep signal integrity. When scanning the network (what the modem
      does automatically) we get information which band has what signal level,
      comparing it to the maximum SAR values measured in a certified laboratory,
      we know which antenna to choose. Due to the characteristics of the
      antenna, one works better in low bands, the other one in high bands.
      However, often in bands which operate together with good parameters, we
      choose the one with lower SAR. In the worst case scenario, we will not
      exceed 0.2 [W/Kg].
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The SAR value of the phone was tested with the phone used at a distance of
      0 mm. That is, right next to the head, as most people use the phone.
      {/* AUTO DISABLED - fix me if you like :) */}
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      Thanks to our patented solutions, you don't have to do anything to meet
      the requirements for exposure to radio waves when using the phone.
      However, we support what organizations, such as the WHO (World Health
      Organization) and the US Food and Drug Administration, have concluded,
      that the best way to reduce exposure is to use headsets, to keep the phone
      away from the head and body during conversations, and to reduce the time
      spent on making phone calls.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      For more information on how to reduce your exposure to electromagnetic
      fields, visit Mudita’s blog.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The phone has an internal antenna. Do not touch it.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      When using other accessories, make sure that the product you are using is
      metal-free.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The phone must comply with international guidelines (ICNIRP) or European
      Directive 2014/53/EU (RED) before it can be sold. The essential
      requirement of the guidelines and directive is the safety of the phone
      user and others.
    </LightText>
  </WindowContainer>
)

export default SarComponent
