import styled, { css } from "styled-components"
import BaseTable, {
  Row as BaseRow,
  Col,
  EmptyState,
} from "Renderer/components/core/table/table.component"
import {
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import { Checkbox } from "Renderer/components/rest/calls/calls-table.styled"

export const animatedOpacityStyles = css`
  opacity: 0;
  visibility: hidden;
  transition: opacity ${transitionTime("veryQuick")}
      ${transitionTimingFunction("smooth")},
    visibility ${transitionTime("veryQuick")}
      ${transitionTimingFunction("smooth")};
`

export const animatedOpacityActiveStyles = css`
  opacity: 1;
  visibility: visible;
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
      opacity: 1;
      visibility: visible;
    }

    ${DeleteCol} {
      opacity: 0.5;
    }
  }
`

export const TemplatesEmptyState = styled(EmptyState)`
  border-top: none;
`
