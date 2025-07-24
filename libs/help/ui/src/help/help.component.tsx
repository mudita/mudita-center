/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent } from "react"
import styled from "styled-components"
import {
  HelpArticle,
  HelpAsset,
  HelpCategory,
  HelpSubcategory,
  HelpTestId,
} from "help/models"
import { defineMessages, useIntl } from "react-intl"
import { CategoryTabs } from "./category-tabs.components"
import { SubcategoriesList } from "./subcategories-list.component"
import { HelpFooter } from "./help-footer.component"
import { Icon } from "app-theme/ui"
import { Search } from "./search.component"
import { IconSize, IconType } from "app-theme/models"

const messages = defineMessages({
  selectorTitle: {
    id: "page.help.deviceSelectorTitle",
  },
})

interface HelpProps extends ComponentProps<typeof HelpFooter> {
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
  onContactSupport,
}) => {
  const intl = useIntl()
  return (
    <form>
      <Wrapper>
        <SearchWrapper>{<Search categories={categories} />}</SearchWrapper>
        <ContentWrapper>
          {!categoriesList ? (
            <LoaderWrapper>
              <DarkSpinnerIcon type={IconType.Spinner} size={IconSize.Big} />
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
        <HelpFooter onContactSupport={onContactSupport} />
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

const DarkSpinnerIcon = styled(Icon)`
  color: ${({ theme }) => theme.app.color.white};
`
