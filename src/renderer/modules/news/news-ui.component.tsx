import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
import { noop } from "Renderer/utils/noop"
import Cards from "Renderer/components/rest/news/cards/cards.component"
import { updateNews } from "Renderer/requests/get-news.request"

interface Props {
  newsItems: NewsEntry[]
  commentsCount: Record<string, number>
  loadData?: () => void
  loadOfflineData?: () => void
  updateData?: (news: any) => void
  online?: boolean
}

const News: FunctionComponent<Props> = ({
  newsItems,
  commentsCount,
  loadData = noop,
  loadOfflineData = noop,
  updateData = noop,
  online,
}) => {
  // Do not review. It will be removed in different task where we add update button
  const handleNewsUpdate = async () => {
    const updatedNews = await updateNews()
    updateData(updatedNews)
  }
  return (
    <div>
      <Cards
        newsItems={newsItems}
        commentsCount={commentsCount}
        loadData={loadData}
        loadOfflineData={loadOfflineData}
        online={online}
      />
      <button onClick={handleNewsUpdate}>Update</button>
    </div>
  )
}

export default News
