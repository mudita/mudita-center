/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Core/core/types/function-component.interface"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectCurrentArticle } from "help/store"
import { useEffect } from "react"
import { trackWithoutDeviceCheckRequest } from "Core/analytic-data-tracker/requests"
import { TrackEventCategory } from "Core/analytic-data-tracker/constants"

export const ArticleTracker: FunctionComponent = () => {
  const { articleId } = useParams<{ articleId: string }>()
  const article = useSelector((state: ReduxRootState) =>
    selectCurrentArticle(state, articleId)
  )

  useEffect(() => {
    if (!article) return
    const startTime = Date.now()

    return () => {
      const endTime = Date.now()
      const time = Math.max(Math.round((endTime - startTime) / 1000), 1)

      void trackWithoutDeviceCheckRequest({
        e_c: TrackEventCategory.HelpFeedbackVisit,
        e_a: `${article.id}/${article.version}/${time}`,
      })
    }
  }, [article])

  return null
}
