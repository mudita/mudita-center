import Button from "Renderer/components/core/button/button.component"
import { InputText } from "Renderer/components/core/input-text/input-text.elements"
import BaseSelectionManager from "Renderer/components/core/selection-manager/selection-manager.component"
import BaseTable, {
  Row as BaseRow,
  Col,
  Sidebar,
} from "Renderer/components/core/table/table.component"
import Text from "Renderer/components/core/text/text.component"
import { Checkbox } from "Renderer/components/rest/calls/calls-table.styled"
import { FiltersWrapper as FiltersWrapperBase } from "Renderer/components/rest/messages/topics-table.component"
import {
  textColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import styled, { keyframes } from "styled-components"

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
      opacity: 1;
      visibility: visible;
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
