/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectCurrentArticle } from "help/store"

const messages = defineMessages({
  title: {
    id: "module.help.article.externalLinksTitle",
  },
})

export const ArticleExternalLinks: FunctionComponent = () => {
  const { articleId } = useParams<{ articleId: string }>()
  const article = useSelector((state: ReduxRootState) =>
    selectCurrentArticle(state, articleId)
  )

  if (!article?.externalLinks) {
    return null
  }

  return (
    <ExternalLinksWrapper>
      <Title>{intl.formatMessage(messages.title)}</Title>
      <Links>
        {article.externalLinks.map((link, index) => (
          <li key={index}>
            <a href={link.url} target={"_blank"} rel={"noopener noreferrer"}>
              {link.title}
            </a>
          </li>
        ))}
      </Links>
    </ExternalLinksWrapper>
  )
}

export const ExternalLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-top: 3.6rem;
`

const Title = styled.p`
  font-size: 1.8rem;
  line-height: 2.2rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.grey1};
  letter-spacing: 0.04em;
  margin: 0;
`

const Links = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;
  padding: 0;
  margin: 0;

  a {
    font-size: ${({ theme }) => theme.fontSize.paragraph3};
    line-height: ${({ theme }) => theme.lineHeight.paragraph3};
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.color.blue1};

    &:hover {
      text-decoration: underline;
    }
  }
`
