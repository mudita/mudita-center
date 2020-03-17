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
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, ipsam iste! Blanditiis facere, maiores! A accusamus, ad adipisci asperiores dignissimos dolorum et harum id itaque iure laboriosam minus modi mollitia nesciunt nulla numquam officia optio perferendis, porro provident quia vitae voluptates. Dolore facilis magni modi praesentium quam quia rem saepe sunt? Ad aliquam animi asperiores consequatur corporis dolore, dolorem est explicabo fuga hic officia pariatur, quod quos repellendus sapiente, totam unde? Animi asperiores autem consectetur dolor error hic id, ipsa, labore laborum maiores non perspiciatis quaerat repudiandae sequi sint velit voluptas voluptatibus. Accusantium, atque autem dolor fugiat itaque quidem totam."
        }
        count={30}
        communityLink={"https://www.google.com/"}
      />
    </Container>
  )
})
