/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type NewsItem = {
  newsId: string
  title: string
  description: string
  link: string
  formattedDate: string
  commentsCount?: number
  communityLink: string
  updatedAt: string
  imageAlt: string
  imageSource: string
}

export type NewsData = NewsItem[]
