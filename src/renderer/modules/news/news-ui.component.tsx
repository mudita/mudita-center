import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
import { noop } from "Renderer/utils/noop"
import Cards from "Renderer/components/rest/news/cards/cards.component"

interface Props {
  newsItems: NewsEntry[]
  commentsCount: Record<string, number>
  loadData?: () => void
}

const News: FunctionComponent<Props> = ({
  newsItems,
  commentsCount,
  loadData = noop,
}) => (
  <Cards
    newsItems={newsItems}
    commentsCount={commentsCount}
    loadData={loadData}
  />
)

export default News
