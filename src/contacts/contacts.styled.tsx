import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

export const ContactSection = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundColor("minor")};
`
