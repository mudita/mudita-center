/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { keyframes } from "styled-components"
import InputText from "Renderer/components/core/input-text/input-text.component"
import { FiltersWrapper } from "Renderer/components/rest/messages/threads-table.component"
import {
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"

const showToggleableElement = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const SearchInput = styled(InputText)`
  animation: ${showToggleableElement} ${transitionTime("veryQuick")} forwards
    ${transitionTimingFunction("standard")};
  width: 28rem;
`

export const MessageFiltersWrapper = styled(FiltersWrapper)`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
`
