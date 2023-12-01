/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css, keyframes } from "styled-components"
import Text, {
  getTextStyles,
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { fontWeight, textColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { StyledIcon } from "App/__deprecated__/renderer/components/core/button/button.styled.elements"

export const Info = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.Paragraph4,
}))`
  margin-bottom: 2.4rem;
`

export const Textarea = styled.textarea`
  ${getTextStyles(TextDisplayStyle.Paragraph1)};
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
  displayStyle: TextDisplayStyle.Paragraph4,
}))<{ error?: boolean }>`
  align-self: flex-end;
  margin-top: 3.2rem;
  margin-bottom: 4rem;

  ${({ error }) =>
    error &&
    css`
      color: ${textColor("error")};
    `};
`

export const TextEditorWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`
