/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { useNavigate, useParams } from "react-router"
import styled from "styled-components"
import { HelpArticle } from "help/models"
import { AnalyticsEvent } from "app-utils/models"
import { ArticleTracker } from "./article-tracker.component"
import { ArticleHeader } from "./article-header.component"
import { ArticleFooter } from "./article-footer.component"
import { ArticleWarning } from "./article-warning.component"
import { ArticleContent } from "./article-content.component"
import { ArticleFeedback } from "./article-feedback.component"
import { ArticleExternalLinks } from "./article-external-links.component"

interface ArticleProps {
  articles: Record<string, HelpArticle>
  ratedArticles: string[]
  rateArticle: ({
    articleId,
    positive,
  }: {
    articleId: string
    positive: boolean
  }) => void
  onContactSupport: VoidFunction
  track: (event: AnalyticsEvent) => Promise<void>
}

export const Article: FunctionComponent<ArticleProps> = ({
  articles,
  ratedArticles,
  rateArticle,
  onContactSupport,
  track,
}) => {
  const navigate = useNavigate()
  const { articleId } = useParams<{ articleId: string }>()

  const article = articleId ? articles[articleId] : undefined

  if (!article) {
    navigate(-1)
    return null
  }

  return (
    <Wrapper>
      <ArticleTracker article={article} track={track} />
      <ArticleHeader title={article.title} />
      <ScrollArea>
        <ArticleWrapper>
          <ArticleWarning article={article} />
          <ArticleContent
            article={article}
            onContactSupport={onContactSupport}
          />
          <ArticleFeedback
            ratedArticles={ratedArticles}
            rateArticle={rateArticle}
          />
          <ArticleExternalLinks article={article} />
        </ArticleWrapper>
        <ArticleFooter />
      </ScrollArea>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ScrollArea = styled.div`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
`

const ArticleWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 3.2rem 3.2rem 5.2rem;
  gap: 3.2rem;
`
