/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { Subcategory } from "./subcategory"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { selectCurrentCategory } from "help/store"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { HelpTestId } from "../test-ids"

export const SubcategoriesList: FunctionComponent = () => {
  const { categoryId } = useParams<{
    categoryId?: string
  }>()
  const category = useSelector((state: ReduxRootState) =>
    selectCurrentCategory(state, categoryId)
  )

  if (!category) {
    return null
  }

  const columns = [
    category.subcategoriesLeftColumn,
    category.subcategoriesRightColumn,
  ]

  return (
    <Wrapper data-testid={HelpTestId.SubcategoriesList}>
      {columns.map((column, index) => {
        return (
          <Column key={index}>
            {column?.map((id) => (
              <Subcategory key={id} id={id} />
            ))}
          </Column>
        )
      })}
    </Wrapper>
  )
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4.6rem;
  justify-content: space-between;

  &:has(${Column} + ${Column}) {
    ${Column} {
      width: 32rem;
    }
  }
`
