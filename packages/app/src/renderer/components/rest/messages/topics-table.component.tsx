/*
  There are only placeholders for table components.
  They should be removed in the future and replaced with
  final version of table and its components
  created in https://appnroll.atlassian.net/browse/PDA-55
*/

import { animatedOpacityActiveStyles } from "Renderer/components/rest/animated-opacity/animated-opacity"
import { VisibleCheckbox } from "Renderer/components/rest/visible-checkbox/visible-checkbox"
import Text from "Renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"

export const Name = styled(Text)`
  grid-area: Name;
  align-self: end;
  margin-bottom: 0.4rem;
`

export const NameWrapper = styled.div`
  display: flex;
  grid-area: Name;
  align-self: end;
`

export const Time = styled(Text)`
  grid-area: Time;
  align-self: end;
  margin-left: 1rem;
  margin-bottom: 0.4rem;
`

export const Message = styled(Text)`
  grid-area: Message;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  align-self: flex-start;
  margin-top: 0.4rem;
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
  grid-template-columns: auto 1fr;
  grid-template-rows: 2.4rem 2.4rem;
  grid-template-areas: "Name Time" "Message Message";
`

export const TableRow = styled.div<{
  checkMode: boolean
}>`
  display: grid;
  grid-template-columns: 11rem 1fr 9rem;
  grid-template-areas: "Checkbox . Actions";
  align-content: center;
  height: 9rem;
  min-height: 9rem;
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
  grid-column-gap: 4rem;
  grid-template-areas: "Filters Search New";
  align-items: center;
  height: 10rem;
  border-bottom: solid 0.1rem ${borderColor("list")};
  padding: 0 3rem;
`

export const TableWrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  background-color: white;
`
