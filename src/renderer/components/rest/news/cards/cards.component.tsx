import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Card from "Renderer/components/rest/news/card/card.component"
import styled from "styled-components"
import { useEffect } from "react"

interface Cards {
  cards: any[]
  loadData: () => void
  newsImagesUrls: any[]
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
`

const Cards: FunctionComponent<Cards> = ({
  newsImagesUrls,
  cards,
  loadData,
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
              header={card.title}
              content={card.content}
              imageSource={newsImagesUrls[index]}
            />
          )
        })}
    </CardContainer>
  )
}

export default Cards
