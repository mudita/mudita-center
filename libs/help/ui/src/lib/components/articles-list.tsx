/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { useSelector } from "react-redux"
import { selectHelpArticles } from "help/store"
import { HelpTestId } from "../test-ids"

interface Props {
  articleIds: string[]
}

export const ArticlesList: FunctionComponent<Props> = ({ articleIds = [] }) => {
  const articles = useSelector(selectHelpArticles)
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
              to={`${URL_MAIN.help}/${article.categoryId}/${id}`}
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
  color: ${({ theme }) => theme.generic.color.grey1};
  font-size: ${({ theme }) => theme.generic.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.generic.lineHeight.paragraph3};
  letter-spacing: 0.05em;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.generic.color.black};
  }
`
