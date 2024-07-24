/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { GenericThemeProvider } from "generic-view/theme"
import { useHistory, useParams } from "react-router"
import styled from "styled-components"
import { ArticleHeader } from "./components/article-header"
import { ArticleWarning } from "./components/article-warning"
import { ArticleContent } from "./components/article-content"
import { ArticleFooter } from "./components/article-footer"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectCurrentArticle } from "help/store"

const Article: FunctionComponent = () => {
  const history = useHistory()
  const { articleId } = useParams<{ articleId: string }>()
  const article = useSelector((state: ReduxRootState) =>
    selectCurrentArticle(state, articleId)
  )

  if (!article) {
    history.goBack()
    return null
  }

  return (
    <Wrapper>
      <ArticleHeader title={article.title} />
      <ArticleWrapper>
        <ArticleWarning />
        <ArticleContent />
      </ArticleWrapper>
      <ArticleFooter />
    </Wrapper>
  )
}

export const ArticlePage: FunctionComponent = () => {
  return (
    <GenericThemeProvider>
      <Article />
    </GenericThemeProvider>
  )
}

const Wrapper = styled.div`
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
