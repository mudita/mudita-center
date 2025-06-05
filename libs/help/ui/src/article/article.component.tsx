/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { useNavigate, useParams } from "react-router"
import styled from "styled-components"
import { ArticleTracker } from "./article-tracker.component"
import { HelpArticle } from "help/models"
import { ArticleHeader } from "./article-header.component"
import { ArticleFooter } from "./article-footer.component"
import { ArticleWarning } from "./article-warning.component"
import { ArticleContent } from "./article-content.component"
import { ArticleFeedback } from "./article-feedback.component"
import { ArticleExternalLinks } from "./article-external-links.component"
// import { GenericThemeProvider } from "generic-view/theme"
// import { ArticleHeader } from "./components/article-header"
// import { ArticleWarning } from "./components/article-warning"
// import { ArticleContent } from "./components/article-content"
// import { ArticleFooter } from "./components/article-footer"
// import { useSelector } from "react-redux"
// import { ReduxRootState } from "Core/__deprecated__/renderer/store"
// import { selectCurrentArticle } from "help/store"
// import {
//   ArticleExternalLinks,
//   ExternalLinksWrapper,
// } from "./components/article-external-links"
// import { ArticleFeedback } from "./components/article-feedback"
// import { ArticleTracker } from "./components/article-tracker"

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
}

export const Article: FunctionComponent<ArticleProps> = ({
  articles,
  ratedArticles,
  rateArticle,
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
      <ArticleTracker article={article} />
      <ArticleHeader title={article.title} />
      <ScrollArea>
        <ArticleWrapper>
          <ArticleWarning article={article} />
          <ArticleContent article={article} />
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
function dispatch(arg0: any) {
  throw new Error("Function not implemented.")
}
