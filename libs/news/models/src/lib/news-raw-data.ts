/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type NewsEntry = {
  category?: string
  title: string
  content: string
  communityLink: string
  link: string
  discussionId?: string
  commentsCount?: number
  date: string
  image: {
    sys: {
      id: string
    }
    fields: {
      title: string
      file: {
        url: string
      }
    }
  }
}

type Asset = {
  sys: {
    id: string
  }
  fields: {
    title: string
    file: {
      url: string
    }
  }
}

export type NewsRawData = {
  items: {
    sys: {
      id: string
      createdAt: string
      updatedAt: string
    }
    fields: NewsEntry
  }[]
  includes?: {
    Asset: Asset[]
  }
}
