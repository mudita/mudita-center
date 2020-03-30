import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Card, {
  Props as CardProps,
} from "Renderer/components/rest/news/card/card.component"
import styled from "styled-components"
import { useEffect } from "react"
import { noop } from "Renderer/utils/noop"

interface NewsImage {
  url: string
  title?: string
}

interface Cards {
  cards: Omit<CardProps, "imageSource" | "imageAlt">[]
  loadData?: () => void
  newsImages: NewsImage[]
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
`

const Cards: FunctionComponent<Cards> = ({
  newsImages,
  cards,
  loadData = noop,
}) => {
  useEffect(() => {
    loadData()
  }, [])
  return (
    <CardContainer>
      {cards &&
        cards.slice(0, 3).map((card, index) => {
          console.log(card.communityLink)
          return (
            <Card
              key={index}
              title={card.title}
              content={card.content}
              imageSource={newsImages[index].url}
              communityLink={card.communityLink}
              url={card.communityLink}
              count={1}
              imageAlt={newsImages[index].title}
            />
          )
        })}
    </CardContainer>
  )
}

export default Cards
