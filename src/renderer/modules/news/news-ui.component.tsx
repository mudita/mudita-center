import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
import { noop } from "Renderer/utils/noop"
import Cards from "Renderer/components/rest/news/cards/cards.component"

interface Props {
  newsItems: NewsEntry[]
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
  online,
}) => (
  <div>
    <Cards
      newsItems={newsItems}
      commentsCount={commentsCount}
      loadData={loadData}
      loadOfflineData={loadOfflineData}
      online={online}
    />
  </div>
)

export default News
