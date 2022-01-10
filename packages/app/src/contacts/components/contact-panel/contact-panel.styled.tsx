/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import {
  backgroundColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import SelectionManager from "Renderer/components/core/selection-manager/selection-manager.component"
import { showToggleableElement } from "Renderer/modules/tools/tabs/notes.styled"

export const Panel = styled.div<{
  selectionMode?: boolean
}>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  align-items: end;
  padding: 2.4rem 3.2rem 0 3.2rem;
  background-color: ${backgroundColor("main")};
  ${({ selectionMode }) =>
    selectionMode &&
    css`
      grid-template-columns: 62.4rem auto;
      padding-left: 0.6rem;
    `};
  label {
    width: auto;
  }
  button {
    padding: 0 0.8rem;
  }
`

export const ContactSelectionManager = styled(SelectionManager)`
  animation: ${showToggleableElement} ${transitionTime("quick")} forwards
    ${transitionTimingFunction("easeInOut")};
  grid-template-columns: 2.8rem 1fr;
`

export const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, minmax(13rem, 1fr));
  grid-column-gap: 1.6rem;
  justify-self: end;

  button {
    width: auto;
  }
`
