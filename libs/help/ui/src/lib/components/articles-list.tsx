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
          <Link
            key={id}
            to={`${URL_MAIN.help}/${article.categoryId}/${id}`}
            title={article.title}
            data-testid={HelpTestId.SubcategoryArticlesListItem}
          >
            {article.title}
          </Link>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const Link = styled(NavLink)`
  color: ${({ theme }) => theme.color.grey1};
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  letter-spacing: 0.05em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.color.black};
  }
`
