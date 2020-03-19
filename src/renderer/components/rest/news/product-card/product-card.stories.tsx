import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import ProductCard from "Renderer/components/rest/news/product-card/product-card.component"

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

storiesOf("News|Product Card", module).add("Product Card", () => {
  return (
    <Container>
      <ProductCard />
    </Container>
  )
})
