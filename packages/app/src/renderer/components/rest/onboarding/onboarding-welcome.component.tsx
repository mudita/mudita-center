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
import ModemDesktop from "Renderer/images/onboarding/modem-desktop@2x.png"
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

const OnboardingWelcomeWrapper = styled(OnboardingWrapper)`
  position: relative;
  grid-template-areas: "Main" "Footer";
  grid-template-rows: 1fr 11rem;
`

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
`
const InstructionText = styled(Text)`
  margin-bottom: 1.3rem;
`
const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2.4rem;

  > i {
    margin-right: 1.2rem;
  }
`

const Autostart = styled.div`
  text-align: center;
  margin-top: 4.8rem;
  margin-bottom: 1.6rem;

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
    <OnboardingWelcomeWrapper>
      <Header>
        <Title
          displayStyle={TextDisplayStyle.PrimaryHeading}
          message={{
            id: "view.name.onboarding.welcome.title",
            values: textFormatters,
          }}
        />
        <InstructionText
          displayStyle={TextDisplayStyle.LargeFadedText}
          message={{ id: "view.name.onboarding.welcome.instruction" }}
        />
        <Info>
          <Icon type={IconType.Info} width={1.6} />
          <Text
            displayStyle={TextDisplayStyle.SmallFadedText}
            message={{ id: "view.name.onboarding.welcome.bluetoothInfo" }}
          />
        </Info>
      </Header>

      <main>
        <Image src={ModemDesktop} width={1010} />
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
    </OnboardingWelcomeWrapper>
  )
}

export default OnboardingWelcome
