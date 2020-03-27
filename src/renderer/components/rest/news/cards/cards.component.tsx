import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Card, {
  Props as CardProps,
} from "Renderer/components/rest/news/card/card.component"
import styled from "styled-components"
import { useEffect } from "react"

interface Cards {
  cards?: CardProps[]
  newsItems: any[]
  loadData: () => void
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
`

const Cards: FunctionComponent<Cards> = ({ cards, newsItems, loadData }) => {
  useEffect(() => {
    loadData()
  }, [])
  return (
    <CardContainer>
      {/*{newsItems &&*/}
      {/*  newsItems.slice(0, 3).map((card, index) => {*/}
      {/*    return <Card key={index} header={card.title} />*/}
      {/*  })}*/}
    </CardContainer>
  )
}

export default Cards
