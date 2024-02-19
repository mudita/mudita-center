/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"
import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import Image from "Core/__deprecated__/renderer/components/core/image/image.component"
import OnboardingContent from "Core/__deprecated__/renderer/images/onboarding-content.png"
import {
  DisplayStyle,
  Type as ButtonType,
} from "Core/__deprecated__/renderer/components/core/button/button.config"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import {
  ButtonsContainer,
  Content,
  DeviceNames,
  HeaderTitle,
  ImageWrapper,
  Container,
  SubheaderTitle,
  ContentTop,
  TroubleshootingButton,
  CancelButton,
  DeviceName,
} from "Core/onboarding/components/onboarding-welcome.styled"

const messages = defineMessages({
  headerTitle: { id: "module.onboarding.headerTitle" },
  subheaderTitle: { id: "module.onboarding.subheaderTitle" },
  primaryButton: { id: "module.onboarding.primaryButton" },
  secondaryButton: { id: "module.onboarding.secondaryButton" },
})

export interface Props {
  onCancel?: VoidFunction
  onTroubleshooting?: VoidFunction
}

const deviceNames = ["Harmony 1", "Harmony 2", "Pure", "Kompakt"]

const OnboardingWelcome: FunctionComponent<Props> = ({
  onCancel = noop,
  onTroubleshooting = noop,
}) => (
  <Container>
    <Content>
      <ContentTop>
        <HeaderTitle
          displayStyle={TextDisplayStyle.Headline1}
          message={messages.headerTitle}
          element={"h1"}
        />
        <SubheaderTitle
          displayStyle={TextDisplayStyle.Paragraph1}
          message={messages.subheaderTitle}
          element={"h2"}
        />
      </ContentTop>
      <div>
        <DeviceNames displayStyle={TextDisplayStyle.Paragraph1}>
          {deviceNames.map((name, key) => (
            <DeviceName key={key}>{name}</DeviceName>
          ))}
        </DeviceNames>
        <ImageWrapper>
          <Image src={OnboardingContent} width={"100%"} />
        </ImageWrapper>
      </div>
    </Content>
    <ButtonsContainer>
      <CancelButton
        type={ButtonType.Button}
        labelMessage={messages.primaryButton}
        onClick={onCancel}
        displayStyle={DisplayStyle.Secondary}
      />
      <TroubleshootingButton
        displayStyle={DisplayStyle.ActionLink}
        labelMessage={messages.secondaryButton}
        onClick={onTroubleshooting}
      />
    </ButtonsContainer>
  </Container>
)

export default OnboardingWelcome
