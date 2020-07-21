import styled, { css } from "styled-components"
import Table, {
  Col,
  EmptyState,
  Row,
} from "Renderer/components/core/table/table.component"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"

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

export const TemplatesListTable = styled(Table)`
  --columnsGap: 0;
  --columnsTemplate: 4rem 69.5rem 1fr;
  --columnsTemplateWithOpenedSidebar: 4rem 27.5rem;
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

export const Checkbox = styled(InputCheckbox)<{ visible?: boolean }>`
  ${animatedOpacityStyles};

  ${({ visible }) => visible && animatedOpacityActiveStyles}
`

export const ListRow = styled(Row)`
  ${Col} {
    button {
      ${animatedOpacityStyles};
    }
  }
  :hover {
    ${Col} {
      button {
        ${animatedOpacityActiveStyles};
      }
      ${Checkbox} {
        ${animatedOpacityActiveStyles};
      }
    }
  }
  ${Col} {
    :first-of-type {
      justify-content: center;
    }
    :last-of-type {
      justify-content: flex-end;
      padding-right: 2.4rem;
    }
  }
`

export const TemplatesEmptyState = styled(EmptyState)`
  border-top: none;
`
