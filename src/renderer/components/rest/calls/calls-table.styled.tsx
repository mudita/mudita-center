import Table, { Col, Row } from "Renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled, { css } from "styled-components"
import Icon from "Renderer/components/core/icon/icon.component"
import { VisibleCheckbox } from "Renderer/components/rest/visible-checkbox/visible-checkbox"
import { animatedOpacityActiveStyles } from "Renderer/components/rest/animated-opacity/animated-opacity"

export const BaseSelectableCalls = styled(Table)<{ mouseLock?: boolean }>`
  flex: 1;
  overflow: auto;
  --columnsTemplate: 4rem 53.8rem 19.5rem 11.5rem auto;
  --columnsTemplateWithOpenedSidebar: 4rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};

  ${Row} {
    :hover {
      ${VisibleCheckbox} {
        ${animatedOpacityActiveStyles};
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
  align-items: center;
  margin-bottom: 1rem;
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

export const NameIcon = styled(Icon)`
  margin-right: 0.5rem;
`

export const StatusCallIcon = styled(Icon)`
  margin-bottom: 0.3rem;
`
