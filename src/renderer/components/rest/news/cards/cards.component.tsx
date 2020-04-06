import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Card from "Renderer/components/rest/news/card/card.component"
import styled from "styled-components"
import { useEffect } from "react"
import { noop } from "Renderer/utils/noop"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

interface Props {
  newsItems: NewsEntry[]
  commentsCount: Record<string, number>
  loadData?: () => void
  loadOfflineData?: () => void
  online?: boolean
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
`

const Cards: FunctionComponent<Props> = ({
  newsItems,
  commentsCount,
  loadData = noop,
  loadOfflineData = noop,
  online,
}) => {
  useEffect(() => {
    if (!online) {
      loadOfflineData()
    }
    loadData()
  }, [online])
  return (
    <CardContainer>
      {newsItems.slice(0, 3).map(newsItem => {
        return (
          <Card
            {...newsItem}
            key={newsItem.newsId}
            url={newsItem.link}
            count={commentsCount[newsItem.newsId]}
          />
        )
      })}
    </CardContainer>
  )
}

export default Cards
