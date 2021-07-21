/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { OnboardingTroubleshootingProps } from "Renderer/components/rest/onboarding/onboarding.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Type as ButtonType,
} from "Renderer/components/core/button/button.config"
import { intl, textFormatters } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import {
  Title,
} from "Renderer/components/rest/onboarding/onboarding.elements"
import styled from "styled-components"
import {
  backgroundColor,
  fontWeight,
  textColor
} from "Renderer/styles/theming/theme-getters"
import { Type } from "../../core/icon/icon.config"
import Icon, { IconSize } from "../../core/icon/icon.component"

export const OnboardingTroubleshootingWrapper = styled.section`
  display: grid;
  grid-template-areas: "Header" "Main" "Footer";
  grid-row-gap: 0;
  grid-template-rows: 12.7rem 1fr 14rem;

  header,
  main,
  footer {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  header {
    grid-area: Header;

    p {
      font-weight: ${fontWeight("light")};
    }
  }

  main {
    grid-area: Main;
  }

  footer {
    grid-area: Footer;
  }
`

const Steps = styled.ol`
  min-width: 38rem;
  text-align: left;
  background-color: ${backgroundColor("main")};
  padding: 2.4rem;
  margin: 0;
  > li { margin-left: 1.6rem;
    
    &:not(:first-of-type) {
      margin-top: 1.6rem;
    }
  }
`

const Support = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: ${fontWeight("light")};

  button {
    margin-left: 0.4rem;
    padding: 0.4rem;
    width: auto;
    height: auto;
  }
`
const TextSorry = styled(Text)`
  margin-bottom: 0.8rem;
`

const Instruction = styled(Text)`
  margin-bottom: 2.4rem;
  margin-top: 1.6rem;
`
const AccordionButton = styled.button<{openMore?: boolean}>`
  border: none;
  background: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-top: 2.9rem;
  margin-bottom: 1.9rem;
  &:focus {
    outline: none;
  }
  span {
    margin-left: 0.8rem;
    svg {
      transform: rotate(${({ openMore}) => (openMore ? 270 : 90)}deg);
    }
  }
`
const MoreSteps = styled.ul`
  list-style-type: '- ';
  text-align: left;
  li {
    color: ${textColor("primary")};
    margin-bottom: 0.8rem;
    font-weight: ${fontWeight("light")};
  }
`
const OnboardingTroubleshooting: FunctionComponent<OnboardingTroubleshootingProps> = ({
  onRetry = noop,
  onContact = noop,
}) => {
  const [openMore, setOpenMore] = useState(false)
  const handleClick: () => void = () => {
    setOpenMore(openMore => !openMore)
  }
  return (
    <OnboardingTroubleshootingWrapper>
      <header>
        <TextSorry
          displayStyle={TextDisplayStyle.MediumText}
          message={{ id: "module.onboarding.troubleshootingSorry" }}
        />
        <Title
          displayStyle={TextDisplayStyle.PrimaryHeading}
          message={{
            id: "module.onboarding.troubleshootingTitle",
            values: textFormatters,
          }}
        />
        <Instruction
          displayStyle={TextDisplayStyle.LargeFadedText}
          message={{ id: "module.onboarding.troubleshootingInstruction" }}
        />
      </header>
      <main>
        <Steps>
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "module.onboarding.troubleshootingSteps1" }}
          />
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "module.onboarding.troubleshootingSteps2" }}
          />
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "module.onboarding.troubleshootingSteps3" }}
          />
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "module.onboarding.troubleshootingSteps4" }}
          />
        </Steps>
        <AccordionButton onClick={handleClick} openMore={openMore}>
          <Text
            displayStyle={TextDisplayStyle.SmallSupplementaryText}
            message={{
              id: "module.onboarding.troubleshootingMoreInstructions",
            }}
          />
          <Icon type={Type.Arrow} size={IconSize.Small} />
        </AccordionButton>
        {openMore && <MoreSteps>
            <Text
              element={"li"}
              displayStyle={TextDisplayStyle.SmallFadedText}
              message={{ id: "module.onboarding.troubleshootingMoreSteps1" }}
            />
            <Text
              element={"li"}
              displayStyle={TextDisplayStyle.SmallFadedText}
              message={{ id: "module.onboarding.troubleshootingMoreSteps2" }}
            />
            <Text
              element={"li"}
              displayStyle={TextDisplayStyle.SmallFadedText}
              message={{ id: "module.onboarding.troubleshootingMoreSteps3" }}
            />
            <Text
              element={"li"}
              displayStyle={TextDisplayStyle.SmallFadedText}
              message={{ id: "module.onboarding.troubleshootingMoreSteps4" }}
            />
          </MoreSteps>}
      </main>
      <footer>
        <ButtonComponent
          type={ButtonType.Button}
          label={intl.formatMessage({
            id: "module.onboarding.troubleshootingButton",
          })}
          onClick={onRetry}
          data-testid="retry"
        />
        <Support>
          <Text
            displayStyle={TextDisplayStyle.SmallFadedText}
            message={{
              id: "module.onboarding.troubleshootingSupportMessage",
            }}
          />
          <ButtonComponent
            displayStyle={DisplayStyle.Link3}
            labelMessage={{
              id: "module.onboarding.supportButton",
            }}
            onClick={onContact}
            data-testid="contact-support"
          />
        </Support>
      </footer>
    </OnboardingTroubleshootingWrapper>
  )
}

export default OnboardingTroubleshooting
