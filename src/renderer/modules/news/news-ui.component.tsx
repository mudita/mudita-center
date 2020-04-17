import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
import { noop } from "Renderer/utils/noop"
import Cards from "Renderer/components/rest/news/cards/cards.component"

interface Props {
  newsItems: NewsEntry[]
  loadData?: () => void
}

const News: FunctionComponent<Props> = ({ newsItems, loadData = noop }) => (
  <Cards newsItems={newsItems} loadData={loadData} />
)

export default News
