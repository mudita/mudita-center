/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import { InputText } from "App/__deprecated__/renderer/components/core/input-text/input-text.elements"
import BaseSelectionManager from "App/__deprecated__/renderer/components/core/selection-manager/selection-manager.component"
import BaseTable, {
  Row as BaseRow,
  Col,
  Sidebar,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import { VisibleCheckbox } from "App/__deprecated__/renderer/components/rest/visible-checkbox/visible-checkbox"
import { FiltersWrapper as FiltersWrapperBase } from "App/__deprecated__/renderer/components/rest/messages/threads-table.component"
import {
  textColor,
  transitionTime,
  transitionTimingFunction,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import styled, { keyframes } from "styled-components"
import { animatedOpacityActiveStyles } from "App/__deprecated__/renderer/components/rest/animated-opacity/animated-opacity"

export const Checkbox = styled(VisibleCheckbox)<{ visible?: boolean }>`
  margin: 0 auto;
`

export const showToggleableElement = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const SearchInput = styled(InputText)`
  animation: ${showToggleableElement} ${transitionTime("veryQuick")} forwards
    ${transitionTimingFunction("standard")};
  width: 38rem;
`

export const FiltersWrapper = styled(FiltersWrapperBase)`
  grid-template-areas: "Search New";
  border: 0;
`

export const NewNoteButton = styled(Button)`
  justify-self: flex-end;
`

export const TextCut = styled(Text)`
  width: 59rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`

export const TextInfo = styled(Text)`
  width: auto;
  padding: 0 1rem;
  color: ${textColor("accent")};
`

export const DeleteCol = styled(Col)`
  opacity: 0;
  transition: opacity ${transitionTime("veryQuick")};
`

export const Table = styled(BaseTable)`
  min-width: 32rem;
  --columnsGap: 0;
  --columnsTemplate: 4rem 59rem 7rem 1fr 5rem;
  --columnsTemplateWithOpenedSidebar: 4rem 27.5rem;

  ${Col} {
    &:nth-of-type(4) {
      margin-left: 9.5rem;
    }
  }
`

export const Row = styled(BaseRow)`
  &:hover {
    ${Checkbox} {
      ${animatedOpacityActiveStyles};
    }

    ${DeleteCol} {
      opacity: 0.5;
    }
  }
`

export const SelectionManager = styled(BaseSelectionManager)`
  animation: ${showToggleableElement} 1s forwards linear;
  margin-left: -2rem;
  width: 72rem;

  button {
    padding: 0 0.8rem;
  }
`

export const NotesSidebar = styled(Sidebar)`
  --header-height: 5.6rem;
  margin-top: 4.7rem;
`

export const TextPreview = styled(Col)`
  height: 100%;
  overflow: hidden;
  cursor: pointer;
`
