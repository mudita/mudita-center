/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { useParams } from "react-router"
import {
  HelpArticle,
  HelpAsset,
  HelpCategory,
  HelpSubcategory,
  HelpTestId,
} from "help/models"
import { Subcategory } from "./subcategory.component"

interface SubcategoriesListProps {
  categories: HelpCategory[]
  subcategories: Record<string, HelpSubcategory>
  assets: Record<string, HelpAsset>
  articles: Record<string, HelpArticle>
}

export const SubcategoriesList: FunctionComponent<SubcategoriesListProps> = ({
  categories,
  assets,
  subcategories,
  articles,
}) => {
  const { categoryId } = useParams<{
    categoryId?: string
  }>()

  const currentCategory =
    categories &&
    categories.find((category) => (categoryId ? category.id : undefined))

  if (!currentCategory) {
    return null
  }

  const columns = [
    currentCategory.subcategoriesLeftColumn,
    currentCategory.subcategoriesRightColumn,
  ]

  return (
    <Wrapper data-testid={HelpTestId.SubcategoriesList}>
      {columns.map((column, index) => {
        return (
          <Column key={index}>
            {column?.map((id) => (
              <Subcategory
                key={id}
                id={id}
                assets={assets}
                subcategories={subcategories}
                articles={articles}
              />
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
