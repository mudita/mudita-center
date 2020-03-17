import { storiesOf } from "@storybook/react"
import * as React from "react"
import Card from "Renderer/components/rest/news/card/card.component"
import styled from "styled-components"

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

storiesOf("News|Card", module).add("Card", () => {
  return (
    <Container>
      <Card
        header={"Example header"}
        imageSource={"http://placekitten.com/g/300/300"}
        url={"https://www.google.com/"}
        content={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?"
        }
        count={30}
        communityLink={"https://www.google.com/"}
      />
    </Container>
  )
})
