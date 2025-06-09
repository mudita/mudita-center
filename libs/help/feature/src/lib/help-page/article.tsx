/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Article } from "help/ui"
import { FunctionComponent } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  selectHelpArticles,
  selectRatedArticles,
} from "../store/help.selectors"
import { rateArticle } from "../store/help.actions"
import type { AppDispatch } from "app-store/models"

export const ArticlePage: FunctionComponent = () => {
  const articles = useSelector(selectHelpArticles)
  const ratedArticles = useSelector(selectRatedArticles)
  const dispatch = useDispatch<AppDispatch>()

  const rateCurrentArticle = ({
    articleId,
    positive,
  }: {
    articleId: string
    positive: boolean
  }) => {
    dispatch(rateArticle({ articleId, positive }))
  }

  return (
    <Article
      articles={articles}
      ratedArticles={ratedArticles}
      rateArticle={rateCurrentArticle}
    />
  )
}
