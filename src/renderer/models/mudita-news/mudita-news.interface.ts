import { ContentTypeLink } from "contentful"

export interface NewsEntry {
  category?: string
  title: string
  content: string
  createdAt: string
  image?: {
    sys?: ContentTypeLink
  }
  communityLink: string
  link: string
  newsId: string
  discussionId: string
  imageSource: string
  imageAlt?: string
  commentsCount?: number
}

export interface DownloadError {
  message?: string
  name?: string
  stack?: string
}

export interface Store {
  newsIds: string[]
  newsItems: NewsEntry[]
  downloadError?: DownloadError
}
