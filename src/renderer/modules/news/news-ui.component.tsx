import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
import { noop } from "Renderer/utils/noop"
import Cards from "Renderer/components/rest/news/cards/cards.component"
import { updateNews } from "Renderer/requests/get-news.request"
import { DefaultNewsItems } from "App/main/default-news-item"

interface Props {
  newsItems: NewsEntry[]
  loadData?: () => void
  updateData?: (news: DefaultNewsItems) => void
  online?: boolean
}

const News: FunctionComponent<Props> = ({
  newsItems,
  loadData = noop,
  updateData = noop,
  online,
}) => {
  // FIXME: Function beneath and button are placeholder. Remove in task regarding update button
  const handleNewsUpdate = async () => {
    const updatedNews = await updateNews()
    updateData(updatedNews)
  }
  return (
    <div>
      <Cards newsItems={newsItems} loadData={loadData} online={online} />
      <button onClick={handleNewsUpdate}>Update</button>
    </div>
  )
}

export default News
