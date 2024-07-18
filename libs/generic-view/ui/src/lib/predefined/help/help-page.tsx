/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { GenericThemeProvider } from "generic-view/theme"
import { useHistory, useParams } from "react-router"
import helpData from "./help.json"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { CategoryTabs } from "./components/category-tabs"
import { Subcategories } from "./components/subcategories"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  selectorTitle: {
    id: "module.help.deviceSelectorTitle",
  },
})

const Help: FunctionComponent = () => {
  const history = useHistory()
  const { categoryId, articleId } = useParams<{
    categoryId?: string
    articleId?: string
  }>()

  if (!categoryId) {
    history.push(`${URL_MAIN.help}/${helpData[0].id}`)
  }

  const categories = helpData.map((category) => {
    return {
      id: category.id,
      name: category.name,
    }
  })

  return (
    <div>
      <SearchWrapper>
        <p>
          Help screen: {categoryId} / {articleId}
        </p>
      </SearchWrapper>
      <ContentWrapper>
        <h2>{intl.formatMessage(messages.selectorTitle)}</h2>
        <CategoryTabs categories={categories} />
        <Subcategories />
      </ContentWrapper>
    </div>
  )
}

export const HelpPage: FunctionComponent = () => {
  return (
    <GenericThemeProvider>
      <Help />
    </GenericThemeProvider>
  )
}

const SearchWrapper = styled.div``

const ContentWrapper = styled.div`
  padding: ${({ theme }) => theme.space.xxl};

  & > h2 {
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    letter-spacing: 0.02em;
    margin: 0 0 2.4rem 0;
  }
`
