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
import { SpinnerLoader } from "app-theme/ui"
import { Search } from "./search.component"

const messages = defineMessages({
  selectorTitle: {
    id: "page.help.deviceSelectorTitle",
  },
})

interface HelpProps {
  categoriesList: HelpCategory[]
  categories: Record<string, HelpCategory>
  subcategories: Record<string, HelpSubcategory>
  assets: Record<string, HelpAsset>
  articles: Record<string, HelpArticle>
}

export const Help: FunctionComponent<HelpProps> = ({
  categoriesList,
  categories,
  assets,
  subcategories,
  articles,
}) => {
  const { categoryId } = useParams<{
    categoryId?: string
  }>()
  const intl = useIntl()

  if (!categoryId && categoriesList && categoriesList.length > 0) {
    return <Navigate to={`${helpPaths.index}/${categoriesList[0].id}`} />
  }

  return (
    <form>
      <Wrapper>
        <SearchWrapper>{<Search categories={categories} />}</SearchWrapper>
        <ContentWrapper>
          {!categoriesList ? (
            <LoaderWrapper>
              <SpinnerLoader dark />
            </LoaderWrapper>
          ) : (
            <>
              <h2 data-testid={HelpTestId.CategoriesTitle}>
                {intl.formatMessage(messages.selectorTitle)}
              </h2>
              <CategoryTabs categories={categoriesList} />
              <SubcategoriesList
                categories={categoriesList}
                subcategories={subcategories}
                assets={assets}
                articles={articles}
              />
            </>
          )}
        </ContentWrapper>
        <HelpFooter />
      </Wrapper>
    </form>
  )
  {
    /* </Form> */
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const SearchWrapper = styled.div`
  padding: 6.4rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.app.color.white};
  border-bottom: 0.1rem solid ${({ theme }) => theme.app.color.grey4};
`

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
