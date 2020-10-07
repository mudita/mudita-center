import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import Text from "Renderer/components/core/text/text.component"

export const OptionsWrapper = styled.div`
  display: grid;
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
  grid-template-columns: repeat(2, 38rem);
  grid-template-rows: repeat(2, 12.6rem);
`

export const OptionButton = styled.button`
  all: unset;
`

export const OptionBox = styled.div`
  display: flex;
  box-sizing: border-box;
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
