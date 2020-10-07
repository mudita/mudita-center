import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import Text from "Renderer/components/core/text/text.component"

export const OptionBox = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 12.6rem;
  width: 38rem;
  padding: 1.6rem 1.6rem 2.4rem 1.6rem;
  background-color: ${backgroundColor("minor")};
  &:hover {
    background-color: ${backgroundColor("icon")};
  }
`

export const OptionBoxIcon = styled(Icon)`
  min-width: 3.2rem;
`

export const TextWrapper = styled.div`
  margin-left: 1.6rem;
`

export const BoldOptionText = styled(Text)`
  margin-top: 0.6rem;
`

export const OptionText = styled(Text)`
  margin-top: 0.8rem;
`
