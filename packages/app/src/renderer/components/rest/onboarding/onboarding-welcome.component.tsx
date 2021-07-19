/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { OnboardingWelcomeProps } from "Renderer/components/rest/onboarding/onboarding.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Image from "Renderer/components/core/image/image.component"
import Infographic from "Renderer/images/onboarding/infographic.png"

import { Type as ButtonType, DisplayStyle } from "Renderer/components/core/button/button.config"
import { intl, textFormatters } from "Renderer/utils/intl"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { noop } from "Renderer/utils/noop"
import {
  OnboardingWrapper,
  Title,
  InstructionText,
  Autostart,
  AutostartLabel,
  AutostartSubText,
  WelcomeButton,
  TroubleshootingButton
} from "Renderer/components/rest/onboarding/onboarding.elements"

const OnboardingWelcome: FunctionComponent<OnboardingWelcomeProps> = ({
  onContinue = noop,
  onAutostartChange = noop,
  autostartEnabled,
  onTroubleshooting = noop
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
          displayStyle={TextDisplayStyle.LargeText}
          message={{ id: "module.onboarding.welcomeInstruction" }}
        />
      </header>

      <main>
        <Image src={Infographic} width={1280} />
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
        <WelcomeButton
          type={ButtonType.Button}
          label={intl.formatMessage({
            id: "module.onboarding.welcomeButton",
          })}
          onClick={onContinue}
          displayStyle={DisplayStyle.Secondary}
        />
        <TroubleshootingButton
          displayStyle={DisplayStyle.Link3}
          labelMessage={{
            id: "module.onboarding.welcomeTroubleshootingButton",
          }}
          onClick={onTroubleshooting}
        />
      </footer>
    </OnboardingWrapper>
  )
}

export default OnboardingWelcome
