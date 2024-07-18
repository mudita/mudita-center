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
import helpData from "./help.json"
import { ArticleContent } from "./components/article-content"

const Article: FunctionComponent = () => {
  const { articleId } = useParams<{ articleId: string }>()
  const article = helpData.articles[articleId as keyof typeof helpData.articles]

  return (
    <Wrapper>
      <ArticleHeader title={article.title} />
      {"warningMessage" in article && (
        <ArticleWarning message={article.warningMessage} />
      )}
      <ArticleContent content={article.content as Document} />
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
