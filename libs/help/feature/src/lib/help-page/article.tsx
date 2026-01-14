/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import { useSelector } from "react-redux"
import { AnalyticsEventCategory } from "app-utils/models"
import { useTrack } from "app-utils/renderer"
import { useAppDispatch } from "app-store/utils"
import { setContactSupportModalVisible } from "contact-support/feature"
import { Article } from "help/ui"
import {
  selectHelpArticles,
  selectRatedArticles,
} from "../store/help.selectors"
import { setArticleRated } from "../store/help.actions"

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

  const openContactSupportFlow = useCallback(() => {
    dispatch(setContactSupportModalVisible(true))
  }, [dispatch])

  return (
    <Article
      articles={articles}
      ratedArticles={ratedArticles}
      rateArticle={rateCurrentArticle}
      onContactSupport={openContactSupportFlow}
      track={track}
    />
  )
}
