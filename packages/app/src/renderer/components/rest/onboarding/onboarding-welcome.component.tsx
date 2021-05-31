/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { OnboardingWelcomeProps } from "Renderer/components/rest/onboarding/onboarding.interface"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Icon from "Renderer/components/core/icon/icon.component"
import Image from "Renderer/components/core/image/image.component"
import Infographic from "Renderer/images/onboarding/infographic.png"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { Type as ButtonType } from "Renderer/components/core/button/button.config"
import { Type as IconType } from "Renderer/components/core/icon/icon.config"
import { intl, textFormatters } from "Renderer/utils/intl"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { noop } from "Renderer/utils/noop"
import {
  OnboardingWrapper,
  Title,
} from "Renderer/components/rest/onboarding/onboarding.elements"

const InstructionText = styled(Text)`
  margin-bottom: 1.3rem;
`
const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2.4rem;

  > span {
    margin-right: 1.2rem;
  }
`

const Autostart = styled.div`
  margin-top: 4.8rem;
  margin-bottom: 1.6rem;
  display: flex;
  align-items: center;
  label {
    margin-bottom: 1.2rem;
  }
`
const AutostartLabel = styled.div`
  margin-left: 1.3rem;
`

const AutostartSubText = styled(Text)`
  text-align: left;
  margin-top: 0.4rem;
`

const OnboardingWelcome: FunctionComponent<OnboardingWelcomeProps> = ({
  onContinue = noop,
  onAutostartChange = noop,
  autostartEnabled,
}) => {
  const onCheckboxToggle = (event: ChangeEvent<HTMLInputElement>) => {
    onAutostartChange(event.target.checked)
  }
  return (
    <OnboardingWrapper>
      <header>
        <Title
          displayStyle={TextDisplayStyle.PrimaryHeading}
          message={{
            id: "module.onboarding.welcomeTitle",
            values: textFormatters,
          }}
        />
        <InstructionText
          displayStyle={TextDisplayStyle.LargeFadedText}
          message={{ id: "module.onboarding.welcomeInstruction" }}
        />
        <Info>
          <Icon type={IconType.Info} width={1.6} />
          <Text
            displayStyle={TextDisplayStyle.SmallFadedText}
            message={{ id: "module.onboarding.welcomeBluetoothInfo" }}
          />
        </Info>
      </header>

      <main>
        <Image src={Infographic} width={1010} />
        {autostartEnabled !== undefined && (
          <Autostart>
            <InputCheckbox
              defaultChecked={autostartEnabled}
              onChange={onCheckboxToggle}
            />
            <AutostartLabel>
              <Text
                displayStyle={TextDisplayStyle.MediumText}
                message={{
                  id: "module.onboarding.welcomeAutostartMessage",
                }}
              />
              <AutostartSubText
                displayStyle={TextDisplayStyle.SmallFadedText}
                message={{ id: "module.onboarding.welcomeAutostartInfo" }}
              />
            </AutostartLabel>
          </Autostart>
        )}
      </main>
      <footer>
        <ButtonComponent
          type={ButtonType.Button}
          label={intl.formatMessage({
            id: "module.onboarding.welcomeButton",
          })}
          onClick={onContinue}
        />
      </footer>
    </OnboardingWrapper>
  )
}

export default OnboardingWelcome
