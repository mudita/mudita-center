/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { defineMessages, useIntl } from "react-intl"
import { HelpTestId, HelpArticle } from "help/models"

const messages = defineMessages({
  title: {
    id: "page.article.externalLinksTitle",
  },
})

interface ArticleExternalLinksProps {
  article: HelpArticle | undefined
}

export const ArticleExternalLinks: FunctionComponent<
  ArticleExternalLinksProps
> = ({ article }) => {
  const intl = useIntl()

  if (!article?.externalLinks) {
    return null
  }

  return (
    <ExternalLinksWrapper data-testid={HelpTestId.ArticleExternalLinks}>
      <Title data-testid={HelpTestId.ArticleExternalLinksTitle}>
        {intl.formatMessage(messages.title)}
      </Title>
      <Links data-testid={HelpTestId.ArticleExternalLinksList}>
        {article.externalLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.url}
              target={"_blank"}
              rel={"noopener noreferrer"}
              data-testid={HelpTestId.ArticleExternalLinksListItem}
            >
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
  font-weight: ${({ theme }) => theme.app.fontWeight.regular};
  color: ${({ theme }) => theme.app.color.grey1};
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
    font-size: ${({ theme }) => theme.app.fontSize.paragraph3};
    line-height: ${({ theme }) => theme.app.lineHeight.paragraph3};
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.app.color.blue1};

    &:hover {
      text-decoration: underline;
    }
  }
`
