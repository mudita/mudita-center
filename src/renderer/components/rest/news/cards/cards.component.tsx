import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Card from "Renderer/components/rest/news/card/card.component"
import styled from "styled-components"
import { useEffect } from "react"
import { noop } from "Renderer/utils/noop"
import {
  IdItem,
  NewsEntry,
} from "Renderer/models/mudita-news/mudita-news.interface"

interface Props {
  newsItems: Record<string, NewsEntry>
  sortedIds: IdItem[]
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
  sortedIds,
  online,
}) => {
  console.log(online)
  useEffect(() => {
    if (!online) {
      loadOfflineData()
    }
    loadData()
  }, [online])
  const news = sortedIds.map(({ id }) => {
    return newsItems[id]
  })
  return (
    <CardContainer>
      {news.slice(0, 3).map(newsItem => {
        return (
          <Card
            key={newsItem.discussionId}
            title={newsItem.title}
            content={newsItem.content}
            imageSource={newsItem.imageSource}
            communityLink={newsItem.communityLink}
            url={newsItem.link}
            count={commentsCount[newsItem.discussionId]}
            imageAlt={newsItem.imageAlt}
          />
        )
      })}
    </CardContainer>
  )
}

export default Cards
