/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import {
  animatedOpacityActiveStyles,
  animatedOpacityStyles,
} from "App/__deprecated__/renderer/components/rest/animated-opacity/animated-opacity"
import { VisibleCheckbox } from "App/__deprecated__/renderer/components/rest/visible-checkbox/visible-checkbox"
import Avatar from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import Table, {
  Col,
  Row,
  Labels,
} from "App/__deprecated__/renderer/components/core/table/table.component"

export const FilesTable = styled(Table)`
  flex: 1;
  min-height: 30rem;
  overflow: initial !important;
  --columnsTemplate: 8.8rem 1fr 15.2rem 15.2rem auto;
  --columnsGap: 0;
  height: 100%;
`
export const FirstCol = styled(Col)`
  margin-left: 3.2rem;
`
export const LastEmptyCol = styled(Col)`
  margin-left: 5.4rem;
`
export const FileIcon = styled(Avatar)`
  margin-left: 3.2rem;
`

export const FilesStorageContainer = styled.div`
  height: 100%;
  z-index: 0;
`
export const TableWrapper = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
`
export const Ellipsis = styled.div`
  display: table-cell;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  padding-right: 3rem;
  box-sizing: border-box;
`
const checkboxShowedStyles = css`
  margin-left: 4.4rem;
  margin-right: 2.8rem;
  display: block;
`
export const Checkbox = styled(VisibleCheckbox)<{ visible?: boolean }>`
  ${({ visible }) => (visible ? checkboxShowedStyles : "display: none;")};
`
export const FilesListRow = styled(Row)<{ hideCheckbox: boolean }>`
  ${({ hideCheckbox }) => {
    if (hideCheckbox) {
      return
    }
    return css`
      :hover {
        ${Checkbox} {
          ${animatedOpacityActiveStyles};
          ${checkboxShowedStyles};
        }

        ${FileIcon} {
          ${animatedOpacityStyles};
          display: none;
        }
      }
    `
  }}
`

export const FilesListLabels = styled(Labels)<{
  filesManagerActionsEnabled: boolean
}>`
  grid-template-columns: var(--columnsTemplate);
  top: ${({ filesManagerActionsEnabled }) =>
    filesManagerActionsEnabled ? "14.5rem" : "5.7rem"};
  z-index: 3 !important;
`
