/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { Typography } from "app-theme/ui"
import {
  HelpArticle,
  HelpAsset,
  HelpSubcategory,
  HelpTestId,
} from "help/models"
import { ArticlesList } from "./articles-list.component"

interface SubcategoryProps {
  id: string
  assets: Record<string, HelpAsset>
  subcategories: Record<string, HelpSubcategory>
  articles: Record<string, HelpArticle>
}

export const Subcategory: FunctionComponent<SubcategoryProps> = ({
  id,
  assets,
  subcategories,
  articles,
}) => {
  // const subcategory = useSelector((state: AppState) =>
  //   selectCurrentSubcategory(state, id)
  // )

  const subcategory = id ? subcategories[id] : undefined

  if (!subcategory || !subcategory.articles.length) {
    return null
  }
  const icon = subcategory.icon ? assets[subcategory.icon].url : undefined

  return (
    <Wrapper
      key={subcategory.id}
      data-testid={HelpTestId.SubcategoriesListItem}
    >
      <Title data-testid={HelpTestId.SubcategoriesListItemTitle}>
        {icon && (
          <Image
            src={icon}
            data-testid={HelpTestId.SubcategoriesListItemIcon}
          />
        )}
        {subcategory.name}
      </Title>
      <ArticlesList articles={articles} articleIds={subcategory.articles} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`

const H5 = styled(Typography.H5)``

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
