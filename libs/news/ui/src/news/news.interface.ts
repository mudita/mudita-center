/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsEntry } from "Core/news/dto"

export interface NewsProps {
  newsItems: NewsEntry[]
  loadData: () => void
}
