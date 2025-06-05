/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import {
  HelpArticle,
  HelpAsset,
  HelpCategory,
  HelpSubcategory,
  HelpTestId,
  helpPaths,
} from "help/models"
import { defineMessages, useIntl } from "react-intl"
import { CategoryTabs } from "./category-tabs.components"
import { SubcategoriesList } from "./subcategories-list.component"
import { Navigate, useParams } from "react-router"
import { HelpFooter } from "./help-footer.component"

const messages = defineMessages({
  selectorTitle: {
    id: "page.help.deviceSelectorTitle",
  },
})

interface HelpProps {
  categories: HelpCategory[]
  subcategories: Record<string, HelpSubcategory>
  assets: Record<string, HelpAsset>
  articles: Record<string, HelpArticle>
}

export const Help: FunctionComponent<HelpProps> = ({
  categories,
  assets,
  subcategories,
  articles,
}) => {
  const { categoryId } = useParams<{
    categoryId?: string
  }>()
  const intl = useIntl()

  if (!categoryId && categories && categories.length > 0) {
    return <Navigate to={`${helpPaths.index}/${categories[0].id}`} />
  }

  return (
    // <Form>
    <Wrapper>
      {/* <SearchWrapper>
          <Search />
        </SearchWrapper> */}
      <ContentWrapper>
        {/* {!categories ? (
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
          )} */}
        {!categories ? (
          <LoaderWrapper>{/* <SpinnerLoader dark /> */}</LoaderWrapper>
        ) : (
          <>
            <h2 data-testid={HelpTestId.CategoriesTitle}>
              {intl.formatMessage(messages.selectorTitle)}
            </h2>
            <CategoryTabs categories={categories} />
            <SubcategoriesList
              categories={categories}
              subcategories={subcategories}
              assets={assets}
              articles={articles}
            />
          </>
        )}
      </ContentWrapper>
      <HelpFooter />
    </Wrapper>
  )
  {
    /* </Form> */
  }
  // <>
  //   <h1>Help Page</h1>
  //   <p>This is the help page.</p>
  //   <HelpCategoryList />
  // </>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

// const SearchWrapper = styled.div`
//   padding: 6.4rem 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: ${({ theme }) => theme.color.white};
//   border-bottom: 0.1rem solid ${({ theme }) => theme.color.grey4};
// `

const ContentWrapper = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.app.space.xxl};
  max-width: 86.2rem;

  & > h2 {
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.app.fontWeight.bold};
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
