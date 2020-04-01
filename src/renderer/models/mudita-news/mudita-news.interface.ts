export interface NewsEntry {
  category?: string
  title: string
  content: string
  image?: {
    sys?: {
      id?: string
    }
  }
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
  images: {
    [key: string]: string
  }
  commentsCount: {
    [key: string]: number
  }
}

export interface NewsImage {
  imageId: string
  imageUrl: string
}
