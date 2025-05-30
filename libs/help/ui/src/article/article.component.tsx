/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
// import { GenericThemeProvider } from "generic-view/theme"
// import { useHistory, useParams } from "react-router"
import styled from "styled-components"
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

export const Article: FunctionComponent = () => {
  // const history = useHistory()
  // const { articleId } = useParams<{ articleId: string }>()
  // const article = useSelector((state: ReduxRootState) =>
  //   selectCurrentArticle(state, articleId)
  // )

  // if (!article) {
  //   history.goBack()
  //   return null
  // }

  return (
    <Wrapper>
      {/* <ArticleTracker /> */}
      {/* <ArticleHeader title={article.title} />
      <ScrollArea>
        <ArticleWrapper>
          <ArticleWarning />
          <ArticleContent />
          <ArticleFeedback />
          <ArticleExternalLinks />
        </ArticleWrapper>
        <ArticleFooter />
      </ScrollArea> */}
      <h1>Article Page</h1>
      <p>This is the article page.</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
