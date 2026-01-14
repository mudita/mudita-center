/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useEffect } from "react"
import { HelpArticle } from "help/models"
import { AnalyticsEvent, AnalyticsEventCategory } from "app-utils/models"

interface ArticleTrackerProps {
  article: HelpArticle | undefined
  track: (event: AnalyticsEvent) => Promise<void>
}

export const ArticleTracker: FunctionComponent<ArticleTrackerProps> = ({
  article,
  track,
}) => {
  useEffect(() => {
    if (!article) return
    const startTime = Date.now()

    return () => {
      const endTime = Date.now()
      const time = Math.max(Math.round((endTime - startTime) / 1000), 1)
      void track({
        e_c: AnalyticsEventCategory.HelpFeedbackVisit,
        e_a: `${article.id}/${article.version}/${time}`,
      })
    }
  }, [article, track])

  return null
}
