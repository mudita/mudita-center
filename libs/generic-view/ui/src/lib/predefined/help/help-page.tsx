/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { useHistory, useParams } from "react-router"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { GenericThemeProvider } from "generic-view/theme"
import { CategoryTabs } from "./components/category-tabs"
import { SubcategoriesList } from "./components/subcategories-list"
import { HelpFooter } from "./components/help-footer"
import { Search } from "./components/search"
import helpData from "./help.json"
import Form from "../../interactive/form/form"

const messages = defineMessages({
  selectorTitle: {
    id: "module.help.deviceSelectorTitle",
  },
})

const Help: FunctionComponent = () => {
  const history = useHistory()
  const { categoryId } = useParams<{
    categoryId?: string
  }>()

  if (!categoryId) {
    history.push(`${URL_MAIN.help}/${helpData.categories[0].id}`)
  }

  return (
    <Wrapper>
      <SearchWrapper>
        <Search />
      </SearchWrapper>
      <ContentWrapper>
        <h2>{intl.formatMessage(messages.selectorTitle)}</h2>
        <CategoryTabs />
        <SubcategoriesList />
      </ContentWrapper>
      <HelpFooter />
    </Wrapper>
  )
}

export const HelpPage: FunctionComponent = () => {
  return (
    <GenericThemeProvider>
      <Form>
        <Help />
      </Form>
    </GenericThemeProvider>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const SearchWrapper = styled.div`
  padding: 6.4rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.white};
  border-bottom: 0.1rem solid ${({ theme }) => theme.color.grey4};
`

const ContentWrapper = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.space.xxl};

  & > h2 {
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    letter-spacing: 0.02em;
    margin: 0 0 2.4rem 0;
  }
`
