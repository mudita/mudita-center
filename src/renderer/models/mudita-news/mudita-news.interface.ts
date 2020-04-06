export interface NewsEntry {
  category?: string
  title: string
  content: string
  updatedAt: string
  createdAt: string
  image?: {
    sys?: {
      id?: string
    }
  }
  communityLink: string
  link: string
  newsId: string
  discussionId: string
  imageSource: string
  imageAlt?: string
}

export interface IdItem {
  id: string
  createdAt: string
}

export interface DownloadError {
  message?: string
  name?: string
  stack?: string
}

export interface Store {
  newsIds: string[]
  newsItems: NewsEntry[]
  commentsCount: {
    [key: string]: number
  }
  downloadError?: DownloadError
}
