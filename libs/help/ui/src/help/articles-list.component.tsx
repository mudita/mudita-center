/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { NavLink } from "react-router"
import { HelpArticle, HelpTestId, helpPaths } from "help/models"

interface Props {
  articles: Record<string, HelpArticle>
  articleIds: string[]
}

export const ArticlesList: FunctionComponent<Props> = ({
  articles,
  articleIds = [],
}) => {
  return (
    <Wrapper data-testid={HelpTestId.SubcategoryArticlesList}>
      {articleIds.map((id) => {
        const article = articles[id]
        if (!article) {
          return null
        }
        return (
          <li key={id}>
            <Link
              to={`${helpPaths.index}/${article.categoryId}/${id}`}
              title={article.title}
              data-testid={HelpTestId.SubcategoryArticlesListItem}
            >
              {article.title}
            </Link>
          </li>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
  }
`

const Link = styled(NavLink)`
  color: ${({ theme }) => theme.app.color.grey1};
  font-size: ${({ theme }) => theme.app.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph3};
  letter-spacing: 0.05em;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.app.color.black};
  }
`
