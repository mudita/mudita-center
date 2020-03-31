export interface NewsEntry {
  category?: string
  title: string
  content: string
  image: any
  communityLink: string
  link: string
  discussionId: string
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
