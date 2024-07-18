/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { useParams } from "react-router"
import styled from "styled-components"
import { H5 } from "../../../texts/headers"
import helpData from "../help.json"
import { ArticlesList } from "./articles-list"

interface Subcategory {
  id: string
  name: string
  icon?: string
  articles?: {
    id: string
    title: string
  }[]
}

export const Subcategories: FunctionComponent = () => {
  const { categoryId } = useParams<{
    categoryId?: string
  }>()
  const category = helpData.find((category) => category.id === categoryId) as {
    subcategoriesLeftColumn: Subcategory[]
    subcategoriesRightColumn: Subcategory[]
  }

  return (
    <Wrapper>
      {category?.subcategoriesLeftColumn.length > 0 && (
        <Column>
          {category.subcategoriesLeftColumn.map((subcategory) => {
            return (
              <Subcategory key={subcategory.id}>
                <Title>
                  {subcategory.icon && <Image src={subcategory.icon} />}
                  {subcategory.name}
                </Title>
                <ArticlesList articles={subcategory.articles} />
              </Subcategory>
            )
          })}
        </Column>
      )}
      {category?.subcategoriesRightColumn.length > 0 && (
        <Column>
          {category.subcategoriesRightColumn.map((subcategory) => {
            return (
              <Subcategory key={subcategory.id}>
                <Title>
                  {subcategory.icon && <Image src={subcategory.icon} />}
                  {subcategory.name}
                </Title>
                <ArticlesList articles={subcategory.articles} />
              </Subcategory>
            )
          })}
        </Column>
      )}
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

const Subcategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`

const Title = styled(H5)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
`

const Image = styled.img`
  height: 2.2rem;
  width: 2.2rem;
  display: block;
  margin: 0;
`
