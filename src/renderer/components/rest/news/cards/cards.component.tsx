import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Card, {
  Props as CardProps,
} from "Renderer/components/rest/news/card/card.component"
import styled from "styled-components"
import { createClient } from "contentful"

interface Cards {
  cards: CardProps[]
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
`

const spaceId = "isxmxtc67n72"
const accessToken = "4OjM0WvVo9FOXtnUmZdCKflW_Ra9qD--W8hdTvTVwGM"
const contentType = "newsItem"

const client = createClient({
  space: spaceId,
  accessToken,
})

const Cards: FunctionComponent<Cards> = ({ cards }) => {
  async function fetchPosts() {
    const response = await client.getEntries({
      content_type: contentType,
    })

    console.log(response)
  }

  fetchPosts()
  return (
    <CardContainer>
      {cards.slice(0, 3).map((card, index) => {
        return <Card key={index} {...card} />
      })}
    </CardContainer>
  )
}

export default Cards
