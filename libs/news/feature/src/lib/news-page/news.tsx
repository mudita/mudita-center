/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { newsItems } from "../default-news.json"
import { News } from "news/ui"

export const NewsPage: FunctionComponent = () => {
  return (
    <News
      newsItems={newsItems}
      loadData={() => {
        //
      }}
    />
  )
}
