import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

export const sortByCreationDateInDescendingOrder = (newsItems: NewsEntry[]) => {
  return newsItems.sort((firstId, secondId) => {
    return (
      Number(new Date(secondId.createdAt)) - Number(new Date(firstId.createdAt))
    )
  })
}
