/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import {
  backgroundColor,
  transitionTime,
  transitionTimingFunction,
} from "Core/core/styles/theming/theme-getters"
import SelectionManager from "Core/__deprecated__/renderer/components/core/selection-manager/selection-manager.component"
import { fadeInAnimation } from "Core/ui/utils/fade-in-animation"

export const PanelWrapper = styled.div`
  position: sticky;
  top: 5.7rem;
  z-index: 1;
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
  button {
    padding: 0 0.8rem;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const FilesManagerSelectionManager = styled(SelectionManager)`
  animation: ${fadeInAnimation} ${transitionTime("quick")} forwards
    ${transitionTimingFunction("easeInOut")};
  grid-template-columns: 2.8rem 1fr;
`
