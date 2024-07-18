/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { useParams } from "react-router"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"

interface Props {
  articles?: {
    id: string
    title: string
  }[]
}

export const ArticlesList: FunctionComponent<Props> = ({ articles = [] }) => {
  const { categoryId } = useParams<{
    categoryId?: string
  }>()
  return (
    <Wrapper>
      {articles.map((article) => {
        return (
          <Link
            key={article.id}
            to={`${URL_MAIN.help}/${categoryId}/${article.id}`}
            title={article.title}
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
