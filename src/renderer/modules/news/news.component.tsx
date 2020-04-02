import React, { useEffect, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  IdItem,
  NewsEntry,
} from "Renderer/models/mudita-news/mudita-news.interface"
import { noop } from "Renderer/utils/noop"
import Cards from "Renderer/components/rest/news/cards/cards.component"
import { getDefaultNews } from "Renderer/requests/get-news.request"

interface Props {
  newsItems: Record<string, NewsEntry>
  sortedIds: IdItem[]
  commentsCount: Record<string, number>
  loadData?: () => void
}

const News: FunctionComponent<Props> = ({
  newsItems,
  commentsCount,
  loadData = noop,
  sortedIds,
}) => {
  const [defaultNews, setDefaultNews] = useState()
  useEffect(() => {
    ;(async () => {
      setDefaultNews(await getDefaultNews())
    })()
  }, [])
  console.log(defaultNews)
  return (
    <div>
      <Cards
        newsItems={newsItems}
        commentsCount={commentsCount}
        loadData={loadData}
        sortedIds={sortedIds}
      />
    </div>
  )
}

export default News
