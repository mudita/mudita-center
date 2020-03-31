import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Card, {
  Props as CardProps,
} from "Renderer/components/rest/news/card/card.component"
import styled from "styled-components"
import { useEffect } from "react"
import { noop } from "Renderer/utils/noop"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

interface Props {
  newsItems: Record<string, NewsEntry>
  newsIds: string[]
  commentsCount: Record<string, number>
  loadData?: () => void
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
`

const Cards: FunctionComponent<Props> = ({
  newsItems,
  newsIds,
  commentsCount,
  loadData = noop,
}) => {
  useEffect(() => {
    loadData()
  }, [])
  const news = newsIds.map(id => newsItems[id])
  return (
    <CardContainer>
      {news.slice(0, 3).map(newsItem => {
        return (
          <Card
            key={newsItem.discussionId}
            title={newsItem.title}
            content={newsItem.content}
            imageSource={""}
            communityLink={newsItem.communityLink}
            url={newsItem.communityLink}
            discussionId={newsItem.discussionId}
            count={commentsCount[newsItem.discussionId] || 0}
            imageAlt={""}
          />
        )
      })}
    </CardContainer>
  )
}

export default Cards
