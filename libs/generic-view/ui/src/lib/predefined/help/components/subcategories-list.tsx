/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { useParams } from "react-router"
import styled from "styled-components"
import helpData from "../help.json"
import { Subcategory } from "./subcategory"

export const SubcategoriesList: FunctionComponent = () => {
  const { categoryId } = useParams<{
    categoryId?: string
  }>()
  const category = helpData.categories.find(
    (category) => category.id === categoryId
  )

  if (!category) {
    return null
  }

  const columns = [
    category.subcategoriesLeftColumn,
    category.subcategoriesRightColumn,
  ]

  return (
    <Wrapper>
      {columns.map((column, index) => {
        return (
          <Column key={index}>
            {column.map((id) => (
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
