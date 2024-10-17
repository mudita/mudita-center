/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { Redirect, useParams } from "react-router"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { GenericThemeProvider } from "generic-view/theme"
import { CategoryTabs } from "./components/category-tabs"
import { SubcategoriesList } from "./components/subcategories-list"
import { HelpFooter } from "./components/help-footer"
// import { Search } from "./components/search"
import { useSelector } from "react-redux"
import { selectHelpCategoriesList } from "help/store"
import { Form, SpinnerLoader } from "generic-view/ui"
import { HelpTestId } from "./test-ids"

const messages = defineMessages({
  selectorTitle: {
    id: "module.help.deviceSelectorTitle",
  },
})

const Help: FunctionComponent = () => {
  const { categoryId } = useParams<{
    categoryId?: string
  }>()
  const categories = useSelector(selectHelpCategoriesList)

  if (!categoryId && categories) {
    return <Redirect to={`${URL_MAIN.help}/${categories[0].id}`} />
  }

  return (
    <Form
      config={{
        defaultFields: {
          search: "",
          activeResultIndex: 0,
        },
      }}
    >
      <Wrapper>
        <SearchWrapper>{/*<Search />*/}</SearchWrapper>
        <ContentWrapper>
          {!categories ? (
            <LoaderWrapper>
              <SpinnerLoader dark />
            </LoaderWrapper>
          ) : (
            <>
              <h2 data-testid={HelpTestId.CategoriesTitle}>
                {intl.formatMessage(messages.selectorTitle)}
              </h2>
              <CategoryTabs />
              <SubcategoriesList />
            </>
          )}
        </ContentWrapper>
        <HelpFooter />
      </Wrapper>
    </Form>
  )
}

export const HelpPage: FunctionComponent = () => {
  return (
    <GenericThemeProvider>
      <Help />
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
  max-width: 86.2rem;

  & > h2 {
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    letter-spacing: 0.02em;
    margin: 0 0 2.4rem 0;
  }
`

const LoaderWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
