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
      title: "Example header",
      url: "https://www.google.com/",
      content: "Lorem ipsum dolor sit amet.",
      count: 2,
      communityLink: "https://www.google.com/",
    },
    {
      title: "Example header",
      url: "https://www.google.com/",
      content: "Lorem ipsum dolor sit amet.",
      count: 2,
      communityLink: "https://www.google.com/",
    },
    {
      title: "Example header",
      url: "https://www.google.com/",
      content: "Lorem ipsum dolor sit amet.",
      count: 2,
      communityLink: "https://www.google.com/",
    },
  ]
  const newsImages = [
    {
      url: "http://placekitten.com/g/300/300",
      title: "Kitten",
    },
    {
      url: "http://placekitten.com/g/300/300",
      title: "Kitten",
    },
    {
      url: "http://placekitten.com/g/300/300",
      title: "Kitten",
    },
  ]
  return (
    <Container>
      <Cards cards={cardsData} newsImages={newsImages} />
    </Container>
  )
})
