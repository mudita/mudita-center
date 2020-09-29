import styled from "styled-components"
import {
  backgroundColor,
  borderColor,
  textColor,
  transitionTime,
} from "Renderer/styles/theming/theme-getters"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import SettingsToggler from "Renderer/components/rest/settings/settings-toggler.component"
import { fadeAnimation } from "Renderer/components/core/modal/modal.styled.elements"
import Text from "Renderer/components/core/text/text.component"

export const TetheringImageWrapper = styled.div`
  margin-top: 4rem;
  padding: 0 3rem 0 4rem;

  img {
    max-height: 35.6rem;
    display: block;
    margin: auto;
    ${fadeAnimation};
    animation-duration: ${transitionTime("slow")};
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 2.4rem;
  padding: 0 3rem 2.4rem 4rem;

  > p {
    line-height: 4rem;
  }
`

export const EnabledButtonWrapper = styled(ButtonWrapper)`
  border-bottom: 0.1rem solid ${borderColor("tetheringSeparator")};
`

export const StyledButton = styled(Button).attrs({
  displayStyle: DisplayStyle.Link3,
})`
  margin-left: auto;
  width: auto;
`

export const ErrorIcon = styled.i`
  border-radius: 100%;
  width: 1.6rem;
  height: 1.6rem;
  background: ${backgroundColor("error")};
  display: inline-block;
  text-align: center;
  color: ${textColor("iconBody")};
  font-style: normal;
  font-size: 1.9rem;
  line-height: 1rem;
  transform: translateY(-0.1rem);

  &:before {
    content: "⨯";
  }
`
export const IconHolder = styled.span`
  display: inline-block;
  margin-right: 1.6rem;
  vertical-align: bottom;
`

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.6rem 3rem 0 4rem;
`

export const TetheringToggler = styled(SettingsToggler)`
  margin-right: 0;
`

export const InfoText = styled(Text)`
  ${fadeAnimation};
  animation-duration: ${transitionTime("slow")};
  padding: 0 3rem 0 4rem;
`

export const NotificationText = styled(Text)`
  padding: 3.6rem 3rem 0 4rem;
`

export const ModemText = styled(NotificationText)`
  padding-top: 0;
`
