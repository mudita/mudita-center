/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import {
  backgroundColor,
  transitionTime,
  transitionTimingFunction,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import SelectionManager from "App/__deprecated__/renderer/components/core/selection-manager/selection-manager.component"
import { showToggleableElement } from "App/__deprecated__/renderer/modules/tools/tabs/notes.styled"

export const Panel = styled.div<{
  selectionMode?: boolean
}>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  align-items: end;
  padding: 2.4rem 3.2rem 0 3.2rem;
  background-color: ${backgroundColor("main")};
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
  grid-template-columns: repeat(2, minmax(13.2rem, 1fr));
  grid-column-gap: 1.6rem;
  justify-self: end;

  button {
    width: auto;
  }
`
