/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"
import { FunctionComponent } from "react"
import { News } from "news/ui"
import { useNews } from "../queries/use-news"

export const NewsPage: FunctionComponent = () => {
  const { data } = useNews()

  return <News newsItems={data} />
}
