import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Table, { Col, Row } from "Renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"

const visibleCheckboxStyles = css`
  opacity: 1;
  visibility: visible;
`
export const Checkbox = styled(InputCheckbox)<{ visible?: boolean }>`
  opacity: 0;
  visibility: hidden;
  transition: opacity ${transitionTime("faster")}
      ${transitionTimingFunction("smooth")},
    visibility ${transitionTime("faster")} ${transitionTimingFunction("smooth")};
  margin: 0 auto;

  ${({ visible }) => visible && visibleCheckboxStyles};
`
export const BaseSelectableCalls = styled(Table)<{ mouseLock?: boolean }>`
  flex: 1;
  overflow: auto;
  --columnsTemplate: 4rem 53.8rem 19.5rem 11.5rem auto;
  --columnsTemplateWithOpenedSidebar: 4rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};

  ${Row} {
    :hover {
      ${Checkbox} {
        ${visibleCheckboxStyles};
      }
    }
  }
`
export const SelectableCalls = styled(BaseSelectableCalls)<{
  active?: boolean
}>`
  --columnsTemplateWithOpenedSidebar: 4rem 22rem 9rem;
  ${({ active }) =>
    active &&
    css`
      --columnsTemplate: 4rem 23rem 8.5rem;
      overflow-x: hidden !important;
    `};
`
export const ContactName = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.SecondaryBoldHeading,
}))`
  display: flex;
  flex-flow: row wrap;
  text-align: center;
  justify-content: center;
  margin-bottom: 1rem;

  svg {
    margin-right: 1rem;
  }
`
export const CallDescription = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.SmallFadedText,
}))`
  text-align: center;
`
export const ClickableCol = styled(Col)<{ active?: boolean }>`
  height: 100%;

  svg {
    margin-right: 1rem;
  }
`
