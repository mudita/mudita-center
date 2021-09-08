/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntryCollection, SyncCollection } from "contentful"
import { NewsEntry } from "App/news/store/mudita-news.interface"

export interface ClientInterface {
  getNews(query: { limit: number }): Promise<EntryCollection<NewsEntry>>
  getHelp(query: HelpQuery): Promise<SyncCollection>
}

export interface HelpQuery {
  nextSyncToken?: string
  locale?: string
}
