import * as React from "react"
import styled from "styled-components"
import Cards from "App/news/components/cards/cards.component"
import { mockedNewsItems } from "App/news/__mocks__/mocked-news-items"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default {
  title: "News/Cards",
}

export const _Cards = () => {
  return (
    <Container>
      <Cards newsItems={mockedNewsItems} />
    </Container>
  )
}
