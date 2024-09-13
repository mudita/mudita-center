/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntryCollection } from "contentful"
import { NewsEntry } from "Core/news/dto"

export interface ClientInterface {
  getNews(query: { limit: number }): Promise<EntryCollection<NewsEntry>>
}
