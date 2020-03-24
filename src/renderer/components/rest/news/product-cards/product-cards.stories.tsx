import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import ProductCards from "Renderer/components/rest/news/product-cards/product-cards.component"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

storiesOf("News|Product Cards", module).add("Product Cards", () => {
  return (
    <Container>
      <ProductCards />
    </Container>
  )
})
