/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
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
import { togglePhoneSimulation } from "App/dev-mode/store/dev-mode.helpers"
import { OnboardingWelcomeTestIds } from "./onboarding-welcome-test-ids.enum"

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2.4rem;

  > div {
    margin-right: 1.2rem;
  }
`

const Autostart = styled.div`
  text-align: center;
  margin-top: 2.4rem;

  label {
    margin-bottom: 1.2rem;
  }
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
            id: "view.name.onboarding.welcome.title",
            values: textFormatters,
          }}
        />
        <Text
          displayStyle={TextDisplayStyle.LargeFadedText}
          message={{ id: "view.name.onboarding.welcome.instruction" }}
        />
      </header>
      <main>
        <Info>
          <Icon type={IconType.Info} width={1.6} />
          <Text
            displayStyle={TextDisplayStyle.SmallFadedText}
            message={{ id: "view.name.onboarding.welcome.bluetoothInfo" }}
          />
        </Info>
        <Image src={Infographic} width={1010} />
        <Autostart>
          {autostartEnabled !== undefined && (
            <InputCheckbox
              defaultChecked={autostartEnabled}
              label={intl.formatMessage({
                id: "view.name.onboarding.welcome.autostartMessage",
              })}
              onChange={onCheckboxToggle}
            />
          )}
          <Text
            displayStyle={TextDisplayStyle.SmallFadedText}
            message={{ id: "view.name.onboarding.welcome.autostartInfo" }}
          />
        </Autostart>
      </main>
      <footer>
        <ButtonComponent
          type={ButtonType.Button}
          label={intl.formatMessage({
            id: "view.name.onboarding.welcome.button",
          })}
          onClick={onContinue}
        />
        {process.env.simulatePhoneConnection && (
          <ButtonComponent
            data-testid={OnboardingWelcomeTestIds.SimulatePhoneButton}
            onClick={togglePhoneSimulation}
            label={"Simulate phone connection"}
          />
        )}
      </footer>
    </OnboardingWrapper>
  )
}

export default OnboardingWelcome
