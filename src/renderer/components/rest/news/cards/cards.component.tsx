import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Card, {
  Props as CardProps,
} from "Renderer/components/rest/news/card/card.component"
import styled from "styled-components"
import { useEffect } from "react"
import { noop } from "Renderer/utils/noop"

interface Cards {
  cards: CardProps[]
  loadData?: () => void
  getCommentsCount?: (postId: number) => void
  commentsCount?: number
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
`

const Cards: FunctionComponent<Cards> = ({
  cards,
  getCommentsCount = noop,
  commentsCount,
  loadData = noop,
}) => {
  useEffect(() => {
    loadData()
  }, [])
  return (
    <CardContainer>
      {cards &&
        cards.slice(0, 3).map((card, index) => {
          return (
            <Card
              key={index}
              title={card.title}
              content={card.content}
              imageSource={card.imageSource}
              communityLink={card.communityLink}
              url={card.communityLink}
              discussionId={card.discussionId}
              getCommentsCount={getCommentsCount}
              count={commentsCount}
              imageAlt={card.imageAlt}
            />
          )
        })}
    </CardContainer>
  )
}

export default Cards
