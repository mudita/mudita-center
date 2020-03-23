import React, { ChangeEvent } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
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
import { intl } from "Renderer/utils/intl"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { noop } from "Renderer/utils/noop"
import {
  OnboardingWrapper,
  Title,
} from "Renderer/components/rest/onboarding/onboarding.elements"

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
  setAutostartOption = noop,
}) => {
  const onCheckboxToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setAutostartOption(event.target.checked)
  }
  return (
    <OnboardingWrapper>
      <header>
        <Title
          displayStyle={TextDisplayStyle.PrimaryHeading}
          message={{
            id: "view.name.onboarding.welcome.title",
            values: {
              bold: (...chunks) => <strong>{chunks}</strong>,
            },
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
          <InputCheckbox
            label={intl.formatMessage({
              id: "view.name.onboarding.welcome.autostartMessage",
            })}
            onChange={onCheckboxToggle}
          />
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
      </footer>
    </OnboardingWrapper>
  )
}

export default OnboardingWelcome
