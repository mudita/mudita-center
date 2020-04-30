import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import ProductCards from "Renderer/components/rest/news/product-cards/product-cards.component"
import NickLewis from "Renderer/images/nick-lewis@2x.png"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const listElements = [
  "Acoustic music",
  "Uplifting lyrics",
  "We've made it our manifesto",
]

export const mockedCards = [
  {
    url: "https://www.mudita.com/",
    imageSource: NickLewis,
    editTitle: "Nick Lewis Album",
    subtitle: "Halfway to the begin",
    label: "In development",
    featuresElements: listElements,
    buttonLabel: "Learn more",
    connected: true,
  },
  {
    url: "https://www.mudita.com/",
    imageSource: NickLewis,
    editTitle: "Nick Lewis Album",
    subtitle: "Halfway to the begin",
    label: "In development",
    featuresElements: listElements,
    buttonLabel: "Learn more",
    connected: false,
  },
  {
    url: "https://www.mudita.com/",
    imageSource: NickLewis,
    editTitle: "Nick Lewis Album",
    subtitle: "Halfway to the begin",
    label: "In development",
    featuresElements: listElements,
    buttonLabel: "Learn more",
    connected: true,
  },
]

storiesOf("News|Product Cards", module).add("Product Cards", () => {
  return (
    <Container>
      <ProductCards productCards={mockedCards} />
    </Container>
  )
})
