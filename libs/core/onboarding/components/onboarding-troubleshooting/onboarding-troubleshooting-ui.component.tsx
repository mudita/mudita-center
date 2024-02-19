/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Type as ButtonType,
} from "Core/__deprecated__/renderer/components/core/button/button.config"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import {
  MoreInstructionsButton,
  InstructionTitle,
  MoreStepsContent,
  Container,
  StepsContent,
  SupportButtonContainer,
  SubheaderTitle,
  HeaderTitle,
  Content,
  ActionsContainer,
  MainActionsContainer,
} from "Core/onboarding/components/onboarding-troubleshooting/onboarding-troubleshooting-ui.styled"
import { OnboardingTroubleshootingUiTestIds } from "Core/onboarding/components/onboarding-troubleshooting/onboarding-troubleshooting-ui-test-ids"

const messages = defineMessages({
  troubleshootingSorry: { id: "module.onboarding.troubleshootingSorry" },
  troubleshootingTitle: { id: "module.onboarding.troubleshootingTitle" },
  troubleshootingInstruction: {
    id: "module.onboarding.troubleshootingInstruction",
  },
  troubleshootingSteps1: { id: "module.onboarding.troubleshootingSteps1" },
  troubleshootingSteps2: { id: "module.onboarding.troubleshootingSteps2" },
  troubleshootingSteps3: { id: "module.onboarding.troubleshootingSteps3" },
  troubleshootingSteps4: { id: "module.onboarding.troubleshootingSteps4" },
  troubleshootingMoreInstructions: {
    id: "module.onboarding.troubleshootingMoreInstructions",
  },
  troubleshootingMoreSteps1: {
    id: "module.onboarding.troubleshootingMoreSteps1",
  },
  troubleshootingMoreSteps2: {
    id: "module.onboarding.troubleshootingMoreSteps2",
  },
  troubleshootingMoreSteps3: {
    id: "module.onboarding.troubleshootingMoreSteps3",
  },
  troubleshootingMoreSteps4: {
    id: "module.onboarding.troubleshootingMoreSteps4",
  },
  changeDeviceButton: { id: "module.onboarding.changeDeviceButton" },
  troubleshootingButton: { id: "module.onboarding.troubleshootingButton" },
  troubleshootingSupportMessage: {
    id: "module.onboarding.troubleshootingSupportMessage",
  },
  supportButton: { id: "module.onboarding.supportButton" },
})

interface Props {
  onRetryButtonClick?: VoidFunction
  onChangeDeviceButtonClick?: VoidFunction
  onContactButtonClick?: VoidFunction
}

const OnboardingTroubleshootingUI: FunctionComponent<Props> = ({
  onRetryButtonClick = noop,
  onChangeDeviceButtonClick = noop,
  onContactButtonClick = noop,
}) => {
  const [openMore, setOpenMore] = useState(false)
  const handleClick: () => void = () => {
    setOpenMore((openMore) => !openMore)
  }
  return (
    <Container>
      <Content>
        <HeaderTitle
          displayStyle={TextDisplayStyle.Paragraph1}
          message={messages.troubleshootingSorry}
        />
        <SubheaderTitle
          displayStyle={TextDisplayStyle.Headline2}
          message={messages.troubleshootingTitle}
        />
        <InstructionTitle
          displayStyle={TextDisplayStyle.Paragraph2}
          message={messages.troubleshootingInstruction}
        />
        <StepsContent>
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.Paragraph1}
            message={messages.troubleshootingSteps1}
          />
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.Paragraph1}
            message={messages.troubleshootingSteps2}
          />
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.Paragraph1}
            message={messages.troubleshootingSteps3}
          />
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.Paragraph1}
            message={messages.troubleshootingSteps4}
          />
        </StepsContent>
        <MoreInstructionsButton
          onClick={handleClick}
          openMore={openMore}
          data-testid={OnboardingTroubleshootingUiTestIds.MoreInstructions}
        >
          <Text
            displayStyle={TextDisplayStyle.Button}
            color="action"
            message={messages.troubleshootingMoreInstructions}
          />
          <Icon type={IconType.Arrow} size={IconSize.Small} />
        </MoreInstructionsButton>
        {openMore && (
          <MoreStepsContent
            data-testid={OnboardingTroubleshootingUiTestIds.MoreSteps}
          >
            <Text
              element={"li"}
              displayStyle={TextDisplayStyle.Paragraph4}
              message={messages.troubleshootingMoreSteps1}
            />
            <Text
              element={"li"}
              displayStyle={TextDisplayStyle.Paragraph4}
              message={messages.troubleshootingMoreSteps2}
            />
            <Text
              element={"li"}
              displayStyle={TextDisplayStyle.Paragraph4}
              message={messages.troubleshootingMoreSteps3}
            />
            <Text
              element={"li"}
              displayStyle={TextDisplayStyle.Paragraph4}
              message={messages.troubleshootingMoreSteps4}
            />
          </MoreStepsContent>
        )}
      </Content>
      <ActionsContainer>
        <MainActionsContainer>
          <ButtonComponent
            type={ButtonType.Button}
            labelMessage={messages.changeDeviceButton}
            onClick={onChangeDeviceButtonClick}
            displayStyle={DisplayStyle.Secondary}
          />
          <ButtonComponent
            type={ButtonType.Button}
            labelMessage={messages.troubleshootingButton}
            onClick={onRetryButtonClick}
            data-testid={OnboardingTroubleshootingUiTestIds.Retry}
          />
        </MainActionsContainer>
        <SupportButtonContainer>
          <Text
            displayStyle={TextDisplayStyle.Label}
            color="disabled"
            message={messages.troubleshootingSupportMessage}
          />
          <ButtonComponent
            displayStyle={DisplayStyle.ActionLink}
            labelMessage={messages.supportButton}
            onClick={onContactButtonClick}
            data-testid={OnboardingTroubleshootingUiTestIds.ContactSupport}
          />
        </SupportButtonContainer>
      </ActionsContainer>
    </Container>
  )
}

export default OnboardingTroubleshootingUI
