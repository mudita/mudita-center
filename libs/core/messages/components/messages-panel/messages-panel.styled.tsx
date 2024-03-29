/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { keyframes } from "styled-components"
import { FiltersWrapper } from "Core/__deprecated__/renderer/components/rest/messages/threads-table.component"
import {
  transitionTime,
  transitionTimingFunction,
} from "Core/core/styles/theming/theme-getters"
import InputSearch from "Core/__deprecated__/renderer/components/core/input-search/input-search.component"
import SelectionManager from "Core/__deprecated__/renderer/components/core/selection-manager/selection-manager.component"

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

export const MessagesInputSearch = styled(InputSearch)`
  animation: ${showToggleableElement} ${transitionTime("veryQuick")} forwards
    ${transitionTimingFunction("standard")};
  width: 28rem;
`

export const MessageFiltersWrapper = styled(FiltersWrapper)<{
  showSearchResults: boolean
}>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  ${({ showSearchResults }) => showSearchResults && "border-bottom: none;"}
`

export const MessagesSelectionManager = styled(SelectionManager)`
  animation: ${showToggleableElement} ${transitionTime("quick")} forwards
    ${transitionTimingFunction("easeInOut")};
  grid-template-columns: 2.8rem 1fr;
`
