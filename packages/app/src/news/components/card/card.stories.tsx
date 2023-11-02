import * as React from "react"
import Card from "App/news/components/card/card.component"
import styled from "styled-components"
import { text, withKnobs } from "@storybook/addon-knobs"

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default {
  title: "News/Card",
  decorators: [withKnobs],
}

export const _Card = () => {
  const content = text("Content", "Lorem ipsum dolor sit amet.")
  return (
    <Container>
      <Card
        title={"Example header"}
        imageSource={"http://placekitten.com/g/300/300"}
        url={"https://www.google.com/"}
        content={content}
        count={30}
        communityLink={"https://www.google.com/"}
        date={"2021-04-27T08:45:32.815Z"}
      />
    </Container>
  )
}
