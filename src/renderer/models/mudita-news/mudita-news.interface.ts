export interface NewsEntry {
  category?: string
  title: string
  content: string
  communityLink: string
  link: string
  discussionId: string
  imageId: string
  imageAlt?: string
}

export interface Store {
  newsIds: string[]
  newsItems: {
    [key: string]: NewsEntry
  }
  commentsCount: {
    [key: string]: number
  }
}
