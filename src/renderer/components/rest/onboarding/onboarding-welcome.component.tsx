import React, { ChangeEvent } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { OnboardingWelcomeProps } from "Renderer/components/rest/onboarding/onboarding.interface"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { fontWeight } from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import Image from "Renderer/components/core/image/image.component"
import Infographic from "Renderer/images/onboarding/infographic.png"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { Type as ButtonType } from "Renderer/components/core/button/button.config"
import { Type as IconType } from "Renderer/components/core/icon/icon.config"
import { intl } from "Renderer/utils/intl"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { noop } from "Renderer/utils/noop"

const OnboardingWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled(Text)`
  font-size: 3rem;
  font-weight: ${fontWeight("light")};
  margin-bottom: 3.2rem;

  strong {
    font-weight: ${fontWeight("default")};
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2.4rem 0;

  > div {
    margin-right: 1.2rem;
  }
`

const Autostart = styled.div`
  text-align: center;
  margin: 2.4rem 0 3.2rem 0;

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
      <ButtonComponent
        type={ButtonType.Button}
        label={intl.formatMessage({
          id: "view.name.onboarding.welcome.button",
        })}
        onClick={onContinue}
      />
    </OnboardingWrapper>
  )
}

export default OnboardingWelcome
