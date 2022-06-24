/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsEntry } from "App/__deprecated__/news/store/mudita-news.interface"

export interface NewsProps {
  newsItems: NewsEntry[]
  loadData?: () => void
}
