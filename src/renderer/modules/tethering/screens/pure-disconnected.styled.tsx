import styled from "styled-components"
import {
  backgroundColor,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"

export const TetheringWrapper = styled.div`
  padding: 3.6rem 3rem 0 4rem;
`
export const TetheringImageWrapper = styled.div`
  background-color: ${backgroundColor("bannerBackground")};
  margin-top: 4rem;

  img {
    max-height: 35.6rem;
    display: block;
    margin: auto;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  margin: 2.8rem 0 1.8rem;

  > p {
    line-height: 4rem;
  }
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
