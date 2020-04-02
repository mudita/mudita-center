export interface NewsEntry {
  category?: string
  title: string
  content: string
  createdAt: string
  image?: {
    sys?: {
      id?: string
    }
  }
  communityLink: string
  link: string
  discussionId: string
  imageSource: string
  imageAlt?: string
}

export interface IdItem {
  id: string
  createdAt: string
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
