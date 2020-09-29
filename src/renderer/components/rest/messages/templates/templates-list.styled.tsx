import styled from "styled-components"
import BaseTable, {
  Col,
  EmptyState,
  Row as BaseRow,
} from "Renderer/components/core/table/table.component"
import { transitionTime } from "Renderer/styles/theming/theme-getters"
import { VisibleCheckbox } from "Renderer/components/rest/visible-checkbox/visible-checkbox"
import { animatedOpacityActiveStyles } from "Renderer/components/rest/animated-opacity/animated-opacity"

export const Checkbox = styled(VisibleCheckbox)<{ visible?: boolean }>`
  margin: 0 auto;
`

export const DeleteCol = styled(Col)`
  opacity: 0;
  transition: opacity ${transitionTime("veryQuick")};
`

export const Table = styled(BaseTable)`
  --columnsGap: 0;
  --columnsTemplate: 4rem 59rem 1fr 5rem;
  --columnsTemplateWithOpenedSidebar: 4rem 27.5rem;

  ${Col} {
    &:nth-of-type(3) {
      margin-left: 14.5rem;
    }
  }
`

export const TextPreview = styled(Col)`
  height: 100%;
  overflow: hidden;
  cursor: pointer;

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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

export const TemplatesEmptyState = styled(EmptyState)`
  border-top: none;
`
