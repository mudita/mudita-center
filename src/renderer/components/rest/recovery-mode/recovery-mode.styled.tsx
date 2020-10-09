import styled from "styled-components"
import {
  backgroundColor,
  fontWeight,
} from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import Text from "Renderer/components/core/text/text.component"

export const RecoveryModeWrapper = styled.section`
  display: grid;
  grid-template-areas: "Header" "Main" "Footer";
  grid-row-gap: 6.4rem;
  grid-template-rows: auto 1fr 11rem;
`

export const OptionsWrapper = styled.main`
  grid-area: Main;
  display: grid;
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
  grid-template-columns: repeat(2, 38rem);
  grid-template-rows: repeat(2, 12.6rem);
`

export const RecoveryModeHeader = styled.header`
  grid-area: Header;
  text-align: center;
`

export const RecoveryModeFooter = styled.footer`
  grid-area: Footer;
  text-align: center;
  display: flex;
  justify-content: center;
`

export const Support = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
`

export const SupportText = styled(Text)`
  white-space: nowrap;
`

export const OptionButton = styled.button`
  border: none;
  text-align: initial;
  cursor: pointer;
  outline: none;
  padding: 0;
`

export const OptionBox = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 2.4rem;
  background-color: ${backgroundColor("minor")};
  min-height: 12.6rem;
  &:hover {
    background-color: ${backgroundColor("icon")};
  }
`

export const OptionBoxIcon = styled(Icon)`
  min-width: 2.8rem;
  margin-top: -0.4rem;
`

export const TextWrapper = styled.div`
  margin-left: 2.4rem;
`

export const OptionText = styled(Text)`
  margin-top: 0.8rem;
  line-height: 2.2rem;
`

export const DescriptionText = styled(Text)`
  font-weight: ${fontWeight("light")};
`
