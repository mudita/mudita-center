/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Article } from "help/ui"
import { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import {
  selectHelpArticles,
  selectRatedArticles,
} from "../store/help.selectors"
import { useAppDispatch } from "app-store/utils"
import { useTrack } from "app-utils/renderer"
import { setArticleRated } from "../store/help.actions"
import { AnalyticsEventCategory } from "app-utils/models"

export const ArticlePage: FunctionComponent = () => {
  const articles = useSelector(selectHelpArticles)
  const ratedArticles = useSelector(selectRatedArticles)
  const dispatch = useAppDispatch()
  const track = useTrack()

  const rateCurrentArticle = ({
    articleId,
    positive,
  }: {
    articleId: string
    positive: boolean
  }) => {
    const version = articles[articleId]?.version ?? "unknown"
    void track({
      e_c: AnalyticsEventCategory.HelpFeedbackVote,
      e_a: `${articleId}/${version}/${positive ? "y" : "n"}`,
    })
    dispatch(setArticleRated(articleId))
  }

  return (
    <Article
      articles={articles}
      ratedArticles={ratedArticles}
      rateArticle={rateCurrentArticle}
    />
  )
}
