/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { HelpArticle } from "help/models"
import { useEffect } from "react"

interface ArticleTrackerProps {
  article: HelpArticle | undefined
}

export const ArticleTracker: FunctionComponent<ArticleTrackerProps> = ({
  article,
}) => {
  useEffect(() => {
    if (!article) return
    const startTime = Date.now()

    return () => {
      const endTime = Date.now()
      const time = Math.max(Math.round((endTime - startTime) / 1000), 1)

      // for analitycs, will be implemented later
      // void trackWithoutDeviceCheckRequest({
      //   e_c: TrackEventCategory.HelpFeedbackVisit,
      //   e_a: `${article.id}/${article.version}/${time}`,
      // })
    }
  }, [article])

  return null
}
