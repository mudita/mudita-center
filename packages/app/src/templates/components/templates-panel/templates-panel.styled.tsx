/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import {
  borderColor,
  backgroundColor,
  transitionTime,
  transitionTimingFunction,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import SelectionManager from "App/__deprecated__/renderer/components/core/selection-manager/selection-manager.component"
import { showToggleableElement } from "App/__deprecated__/renderer/modules/tools/tabs/notes.styled"

export const PanelWrapper = styled.div`
  border-bottom: solid 0.1rem ${borderColor("list")};
`

export const Panel = styled.div<{
  selectionMode?: boolean
}>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  align-items: end;
  padding: 2.4rem 3.2rem;
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

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const TemplatesSelectionManager = styled(SelectionManager)`
  animation: ${showToggleableElement} ${transitionTime("quick")} forwards
    ${transitionTimingFunction("easeInOut")};
  grid-template-columns: 2.8rem 1fr;
`
