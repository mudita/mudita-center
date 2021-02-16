/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ContentTypeLink } from "contentful"

export interface NewsEntry {
  category?: string
  title: string
  content: string
  updatedAt: string
  createdAt: string
  image?: {
    sys?: ContentTypeLink
  }
  communityLink: string
  link: string
  newsId: string
  discussionId: string
  imageSource?: string
  imageAlt?: string
  commentsCount?: number
}

export interface DownloadError {
  message?: string
  name?: string
  stack?: string
}

export interface Store {
  newsItems: NewsEntry[]
  lastUpdate?: string
  updating?: boolean
  downloadError?: DownloadError
}
