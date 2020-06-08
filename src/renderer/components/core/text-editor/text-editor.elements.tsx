import styled, { css, keyframes } from "styled-components"
import Text, {
  getTextStyles,
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { fontWeight } from "Renderer/styles/theming/theme-getters"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { StyledIcon } from "Renderer/components/core/button/button.styled.elements"

export const Info = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.MediumFadedLightText,
}))`
  margin-bottom: 2.4rem;
`

export const Textarea = styled.textarea`
  ${getTextStyles(TextDisplayStyle.LargeText)};
  resize: none;
  appearance: none;
  outline: none;
  line-height: 2;
  font-weight: ${fontWeight("default")};
  border: none;
  overflow: auto;
  margin-right: -0.5rem;
  padding: 0 1rem 0 0;
  flex: 1;
  background-color: transparent;
`

const iconAnimation = keyframes`
  from {
    transform: rotateZ(0deg)
  }
  to {
    transform: rotateZ(360deg)
  }
`

export const SaveButton = styled(ButtonComponent)<{ saving?: boolean }>`
  ${({ saving }) =>
    saving &&
    css`
      pointer-events: none;

      ${StyledIcon} {
        animation: ${iconAnimation} 1s infinite linear;
      }
    `};
`

export const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, minmax(13rem, 1fr));
  grid-column-gap: 1.6rem;
  align-self: flex-end;
  margin-bottom: 3.2rem;

  button {
    width: auto;
  }
`

export const StatsInfo = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.MediumFadedLightText,
}))`
  align-self: flex-end;
  margin-top: 3.2rem;
  margin-bottom: 4rem;
`

export const TextEditorWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`
