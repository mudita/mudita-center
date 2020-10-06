import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

export const OptionBox = styled.div`
  height: 12.6rem;
  width: 38rem;
  background-color: ${backgroundColor("minor")};
  &:hover {
    background-color: ${backgroundColor("icon")};
  }
`
