/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { GenericThemeProvider } from "generic-view/theme"
import { useParams } from "react-router"
import styled from "styled-components"
import { Document } from "@contentful/rich-text-types"
import { ArticleHeader } from "./components/article-header"
import { ArticleWarning } from "./components/article-warning"
import { ArticleContent } from "./components/article-content"
import { ArticleFooter } from "./components/article-footer"
import helpData from "./help.json"

const Article: FunctionComponent = () => {
  const { articleId } = useParams<{ articleId: string }>()
  const article = helpData.articles[articleId as keyof typeof helpData.articles]

  return (
    <Wrapper>
      <ArticleHeader title={article.title} />
      <ArticleWrapper>
        {"warningMessage" in article && (
          <ArticleWarning message={article.warningMessage} />
        )}
        <ArticleContent content={article.content as Document} />
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
