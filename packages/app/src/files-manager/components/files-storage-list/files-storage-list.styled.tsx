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
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"

export const FilesTable = styled(Table)`
  flex: 1;
  overflow: auto;
  --columnsTemplate: 8.8rem 1fr 15.2rem 15.2rem auto;
  --columnsGap: 0;
`
export const FirstCol = styled(Col)`
  margin-left: 3.2rem;
`
export const FileIcon = styled(Avatar)`
  margin-left: 3.2rem;
`
export const FileIconHarmony = styled(Avatar)`
  margin-left: 3.2rem;
  background-color: ${backgroundColor("row")};
`
export const FilesStorageContainer = styled.div`
  height: 100%;
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
export const FilesListRow = styled(Row)`
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
