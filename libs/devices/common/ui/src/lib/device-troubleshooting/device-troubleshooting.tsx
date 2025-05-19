/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useState } from "react"
import styled, { css } from "styled-components"
import { defineMessages, formatMessage } from "app-localize/utils"
import { Button, Icon } from "app-theme/ui"
import {
  ButtonSize,
  ButtonTextModifier,
  ButtonType,
  IconSize,
  IconType,
} from "app-theme/models"

const messages = defineMessages({
  title: { id: "general.troubleshootingScreen.title" },
  subtitle: { id: "general.troubleshootingScreen.subtitle" },
  instructionsTitle: {
    id: "general.troubleshootingScreen.instructions.title",
  },
  additionalInstructionsTitle: {
    id: "general.troubleshootingScreen.additionalInstructions.title",
  },
  tryAgainButton: {
    id: "general.troubleshootingScreen.button.text",
  },
  contactSupportLabel: {
    id: "general.troubleshootingScreen.contactSupport.text",
  },
})

const basicInstructions = defineMessages({
  step1: {
    id: "general.troubleshootingScreen.instructions.step1",
  },
  step2: {
    id: "general.troubleshootingScreen.instructions.step2",
  },
  step3: {
    id: "general.troubleshootingScreen.instructions.step3",
  },
  step4: {
    id: "general.troubleshootingScreen.instructions.step4",
  },
})

const additionalInstructions = defineMessages({
  step1: {
    id: "general.troubleshootingScreen.additionalInstructions.step1",
  },
  step2: {
    id: "general.troubleshootingScreen.additionalInstructions.step2",
  },
  step3: {
    id: "general.troubleshootingScreen.additionalInstructions.step3",
  },
  step4: {
    id: "general.troubleshootingScreen.additionalInstructions.step4",
  },
})

interface Props {
  onTryAgain?: VoidFunction
}

export const DeviceTroubleshooting: FunctionComponent<Props> = ({
  onTryAgain,
}) => {
  const [additionalInstructionsVisible, setAdditionalInstructionsVisible] =
    useState(false)

  const toggleAdditionalInstructions = () => {
    setAdditionalInstructionsVisible((prev) => !prev)
  }

  return (
    <Wrapper>
      <Header>
        <p>{formatMessage(messages.subtitle)}</p>
        <h1>{formatMessage(messages.title)}</h1>
      </Header>
      <InstructionsBox>
        <p>{formatMessage(messages.instructionsTitle)}</p>
        <ol>
          {Object.keys(basicInstructions).map((key) => (
            <li key={key}>
              {formatMessage(
                basicInstructions[key as keyof typeof basicInstructions]
              )}
            </li>
          ))}
        </ol>
      </InstructionsBox>
      <AdditionalInstructionsBox>
        <Button
          onClick={toggleAdditionalInstructions}
          type={ButtonType.Text}
          modifiers={[ButtonTextModifier.Link]}
          size={ButtonSize.AutoMin}
        >
          {formatMessage(messages.additionalInstructionsTitle)}
          <AdditionalInstructionsIcon
            type={IconType.ChevronDown}
            size={IconSize.Small}
            $rotated={additionalInstructionsVisible}
          />
        </Button>
        <AdditionalInstructionsList $visible={additionalInstructionsVisible}>
          {Object.keys(additionalInstructions).map((key) => (
            <li key={key}>
              {formatMessage(
                additionalInstructions[
                  key as keyof typeof additionalInstructions
                ]
              )}
            </li>
          ))}
        </AdditionalInstructionsList>
      </AdditionalInstructionsBox>
      <TryAgain>
        <Button onClick={onTryAgain} size={ButtonSize.Large}>
          {formatMessage(messages.tryAgainButton)}
        </Button>
        <Support>
          <p>{formatMessage(messages.contactSupportLabel)}&nbsp;</p>
          {/* TODO: Implement contact support button when available */}
          <Button
            type={ButtonType.Text}
            size={ButtonSize.AutoMin}
            modifiers={[ButtonTextModifier.Link]}
          >
            Contact support
          </Button>
        </Support>
      </TryAgain>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  background-color: ${({ theme }) => theme.app.color.white};
  overflow: auto;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding-bottom: 1.6rem;

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.app.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.app.lineHeight.paragraph1};
    letter-spacing: 0.02em;
  }

  h1 {
    margin: 0;
    font-size: ${({ theme }) => theme.app.fontSize.headline2};
    line-height: ${({ theme }) => theme.app.lineHeight.headline2};
    font-weight: ${({ theme }) => theme.app.fontWeight.regular};
  }
`

const InstructionsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;

  p {
    font-size: ${({ theme }) => theme.app.fontSize.paragraph2};
    line-height: ${({ theme }) => theme.app.lineHeight.paragraph2};
    color: ${({ theme }) => theme.app.color.grey2};
    font-weight: ${({ theme }) => theme.app.fontWeight.light};
    letter-spacing: 0.02em;
    margin: 0;
  }

  ol {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin: 0;
    padding: 2.4rem;
    background-color: ${({ theme }) => theme.app.color.grey6};
    border-radius: ${({ theme }) => theme.app.radius.sm};

    li {
      list-style-position: inside;
      color: ${({ theme }) => theme.app.color.grey1};
      font-size: ${({ theme }) => theme.app.fontSize.paragraph1};
      line-height: ${({ theme }) => theme.app.lineHeight.paragraph1};
      letter-spacing: 0.02em;
    }
  }
`

const AdditionalInstructionsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`

const AdditionalInstructionsList = styled.ul<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 0;
  padding: 0;
  list-style-type: "- ";
  list-style-position: inside;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  height: calc-size(min-content, size * 0);

  transition-property: height, opacity, visibility;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  ${({ $visible }) =>
    $visible &&
    css`
      height: calc-size(min-content, size * 1);
      opacity: 1;
      visibility: visible;
    `}

  li {
    font-size: ${({ theme }) => theme.app.fontSize.paragraph4};
    line-height: ${({ theme }) => theme.app.lineHeight.paragraph4};
    font-weight: ${({ theme }) => theme.app.fontWeight.light};
    letter-spacing: 0.05em;
  }
`

const AdditionalInstructionsIcon = styled(Icon)<{ $rotated: boolean }>`
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  transform: rotate(${({ $rotated }) => ($rotated ? "-180deg" : "0deg")});
`

const TryAgain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 1.8rem;
`

const Support = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    font-size: ${({ theme }) => theme.app.fontSize.labelText};
    line-height: ${({ theme }) => theme.app.lineHeight.labelText};
    color: ${({ theme }) => theme.app.color.grey3};
    letter-spacing: 0.04em;
    margin: 0;
  }
`
