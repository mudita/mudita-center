import Button from "Renderer/components/core/button/button.component"
import { InputText } from "Renderer/components/core/input-text/input-text.elements"
import BaseSelectionManager from "Renderer/components/core/selection-manager/selection-manager.component"
import BaseTable, {
  Row as BaseRow,
  Col as BaseCol,
} from "Renderer/components/core/table/table.component"
import Text from "Renderer/components/core/text/text.component"
import { Checkbox } from "Renderer/components/rest/calls/calls-table.component"
import { FiltersWrapper as FiltersWrapperBase } from "Renderer/components/rest/messages/topics-table.component"
import {
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

export const SearchButton = styled(Button)`
  justify-self: flex-end;
`

export const Table = styled(BaseTable)`
  --columnsTemplate: 4rem 73.5rem auto;
  --columnsGap: 0;
`

export const TextCut = styled(Text)`
  width: 59rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`

export const Row = styled(BaseRow)`
  &:hover {
    ${Checkbox} {
      opacity: 1;
      visibility: visible;
    }
  }
`

export const Col = styled(BaseCol)`
  align-self: stretch;
`

export const SelectionManager = styled(BaseSelectionManager)`
  animation: ${showToggleableElement} 1s forwards linear;
  margin-left: -2rem;
  width: 72rem;
`

export const EmptyState = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  min-height: 30rem;
`
