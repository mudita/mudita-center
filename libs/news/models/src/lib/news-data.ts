/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type NewsItem = {
  newsId: string
  title: string
  category?: string
  content: string
  link: string
  commentsCount?: number
  communityLink: string
  discussionId?: string
  imageId: string
  imageAlt: string
  imageSource: string
  date: string
  createdAt: string
  updatedAt: string
}

export type NewsData = {
  newsItems: NewsItem[]
  lastUpdate: string
}
