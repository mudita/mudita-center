/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/*
  There are only placeholders for table components.
  They should be removed in the future and replaced with
  final version of table and its components
  created in https://appnroll.atlassian.net/browse/PDA-55
*/

import { animatedOpacityActiveStyles } from "App/__deprecated__/renderer/components/rest/animated-opacity/animated-opacity"
import { VisibleCheckbox } from "App/__deprecated__/renderer/components/rest/visible-checkbox/visible-checkbox"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"

/* stylelint-disable property-no-vendor-prefix */
/* stylelint-disable value-no-vendor-prefix */
export const Name = styled(Text)`
  grid-area: Name;
  align-self: end;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const NameWrapper = styled.div`
  display: flex;
  grid-area: Name;
  align-self: end;
  align-items: center;
`

export const Time = styled(Text)`
  grid-area: Time;
  align-self: end;
  margin-left: 0.8rem;
  display: flex;
  align-items: center;
  height: 100%;
`

export const Message = styled(Text)`
  grid-area: Message;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  align-self: flex-start;
`

export const Checkbox = styled(VisibleCheckbox)`
  grid-area: Checkbox;
`

export const CheckboxWrapper = styled.div`
  grid-area: Checkbox;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ActionsWrapper = styled.div`
  grid-area: Actions;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9rem;
`

export const DataWrapper = styled.div`
  display: grid;
  grid-template-columns: auto minmax(5.6rem, 1fr);
  grid-template-rows: 1fr 2.2rem;
  grid-template-areas: "Name Time" "Message Message";
`

export const TableRow = styled.div<{
  checkMode: boolean
}>`
  display: grid;
  grid-template-columns: 11rem 1fr 9rem;
  grid-template-areas: "Checkbox . Actions";
  align-content: center;
  min-height: 8rem;
  box-sizing: border-box;
  border-bottom: solid 0.1rem ${borderColor("list")};
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${backgroundColor("minor")};

    ${Checkbox} {
      ${animatedOpacityActiveStyles};
    }
  }

  ${Checkbox} {
    ${({ checkMode }) => checkMode && animatedOpacityActiveStyles};
  }
`

export const FilterButton = styled.button<{ inactive: boolean }>`
  ${({ inactive }) =>
    inactive &&
    css`
      opacity: 0.3;
    `};
`

export const UnreadFilters = styled.div`
  grid-area: Filters;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const FiltersWrapper = styled.div`
  display: grid;
  grid-template-areas: "Filters Search New";
  align-items: center;
  border-bottom: solid 0.1rem ${borderColor("list")};
  padding: 2.4rem 3.2rem;
`

export const TableWrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  background-color: white;
`
