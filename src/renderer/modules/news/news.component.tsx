import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  IdItem,
  NewsEntry,
} from "Renderer/models/mudita-news/mudita-news.interface"
import { noop } from "Renderer/utils/noop"
import Cards from "Renderer/components/rest/news/cards/cards.component"

interface Props {
  newsItems: Record<string, NewsEntry>
  sortedIds: IdItem[]
  commentsCount: Record<string, number>
  loadData?: () => void
  loadOfflineData?: () => void
  online?: boolean
}

const News: FunctionComponent<Props> = ({
  newsItems,
  commentsCount,
  loadData = noop,
  loadOfflineData = noop,
  sortedIds,
  online,
}) => {
  return (
    <div>
      <Cards
        newsItems={newsItems}
        commentsCount={commentsCount}
        online={online}
        loadData={loadData}
        loadOfflineData={loadOfflineData}
        sortedIds={sortedIds}
      />
    </div>
  )
}

export default News
