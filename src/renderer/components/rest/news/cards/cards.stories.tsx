import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import Cards from "Renderer/components/rest/news/cards/cards.component"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

storiesOf("News|Cards", module).add("Cards", () => {
  const cardsData = [
    {
      header: "Example header",
      imageSource: "http://placekitten.com/g/300/300",
      url: "https://www.google.com/",
      content: "Lorem ipsum dolor sit amet.",
      count: 2,
      communityLink: "https://www.google.com/",
    },
    {
      header: "Example header",
      imageSource: "http://placekitten.com/g/300/300",
      url: "https://www.google.com/",
      content: "Lorem ipsum dolor sit amet.",
      count: 2,
      communityLink: "https://www.google.com/",
    },
    {
      header: "Example header",
      imageSource: "http://placekitten.com/g/300/300",
      url: "https://www.google.com/",
      content: "Lorem ipsum dolor sit amet.",
      count: 2,
      communityLink: "https://www.google.com/",
    },
  ]
  return (
    <Container>
      <Cards cards={cardsData} />
    </Container>
  )
})
