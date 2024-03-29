/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import {
  backgroundColor,
  transitionTime,
  transitionTimingFunction,
} from "Core/core/styles/theming/theme-getters"
import SelectionManager from "Core/__deprecated__/renderer/components/core/selection-manager/selection-manager.component"
import { fadeInAnimation } from "Core/ui/utils/fade-in-animation"

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
  animation: ${fadeInAnimation} ${transitionTime("quick")} forwards
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
