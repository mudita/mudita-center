/*
  This is only placeholder for table component.
  It should be removed in the future and replaced with
  final version created in https://appnroll.atlassian.net/browse/PDA-55
*/

import React, { Dispatch, SetStateAction, useState } from "react"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, {
  css,
  FlattenInterpolation,
  ThemeProps,
} from "styled-components"

export interface TableRowProps<T> {
  row: T
  index?: number
  checkMode?: boolean
}

export interface FiltersProps {
  checkedRows: Set<any>
  setCheckedRows: Dispatch<SetStateAction<Set<any>>>
}

type FiltersFunction<T> = (props: FiltersProps) => JSX.Element

type TemplateFunction<T> = (props: TableRowProps<T>) => JSX.Element

type RowLayoutStyle = FlattenInterpolation<ThemeProps<any>>

interface TableProps {
  rows: any[]
  rowTemplate: TemplateFunction<any>
  actionsTemplate?: TemplateFunction<any>
  tableFilters?: FiltersFunction<any>
  selectable?: boolean
  rowLayoutStyle?: RowLayoutStyle
}

const Checkbox = styled(InputCheckbox)`
  grid-area: Checkbox;
  opacity: 0;
  visibility: hidden;
  transition: all 0.15s ease-in-out;
`

const CheckboxWrapper = styled.div`
  grid-area: Checkbox;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ActionsWrapper = styled.div`
  grid-area: Actions;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9rem;
`

const checkboxActiveStyle = css`
  opacity: 1;
  visibility: visible;
`

const TableRow = styled.div<{
  layout?: RowLayoutStyle
  checkMode: boolean
}>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "Checkbox . Actions";
  align-content: center;
  height: 9rem;
  min-height: 9rem;
  box-sizing: border-box;
  border-bottom: solid 0.1rem ${borderColor("light")};
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${backgroundColor("accent")};

    ${Checkbox} {
      ${checkboxActiveStyle};
    }
  }

  ${Checkbox} {
    ${({ checkMode }) => checkMode && checkboxActiveStyle};
  }

  ${({ layout }) => layout};
`

const TableWrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
`

const Table: FunctionComponent<TableProps> = ({
  rows,
  rowTemplate,
  actionsTemplate,
  selectable = true,
  rowLayoutStyle,
  tableFilters,
}) => {
  const [checkedRows, setCheckedRows] = useState(new Set())
  const checkMode = Boolean(checkedRows.size)

  return (
    <>
      {tableFilters && tableFilters({ checkedRows, setCheckedRows })}
      <TableWrapper>
        {rows.map((row, index) => {
          const toggleRowSelection = () => {
            const tempSet = new Set(checkedRows)
            tempSet.has(row) ? tempSet.delete(row) : tempSet.add(row)
            setCheckedRows(tempSet)
          }
          return (
            <TableRow key={index} layout={rowLayoutStyle} checkMode={checkMode}>
              {rowTemplate({ row, index, checkMode })}
              {selectable && (
                <CheckboxWrapper>
                  <Checkbox
                    checked={checkedRows.has(row)}
                    onChange={toggleRowSelection}
                  />
                </CheckboxWrapper>
              )}
              {actionsTemplate && (
                <ActionsWrapper>
                  {actionsTemplate({ row, index })}
                </ActionsWrapper>
              )}
            </TableRow>
          )
        })}
      </TableWrapper>
    </>
  )
}

export default Table
