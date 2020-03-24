import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Card, {
  Props as CardProps,
} from "Renderer/components/rest/news/card/card.component"
import styled from "styled-components"

interface Cards {
  cards: CardProps[]
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
`

const Cards: FunctionComponent<Cards> = ({ cards }) => (
  <CardContainer>
    {cards.slice(0, 3).map((card, index) => {
      return <Card key={index} {...card} />
    })}
  </CardContainer>
)

export default Cards
