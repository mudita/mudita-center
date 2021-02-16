/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import ProductCard from "Renderer/components/rest/news/product-card/product-card.component"
import NickLewis from "Renderer/images/nick-lewis@2x.png"

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aquamarine;
`

storiesOf("News/Product Card", module)
  .add("Connected", () => {
    const listElements = [
      "Acoustic music",
      "Uplifting lyrics",
      "We've made it our manifesto",
    ]
    return (
      <Container>
        <ProductCard
          url={"https://www.mudita.com/"}
          imageSource={NickLewis}
          title="Nick Lewis Album"
          subtitle="Halfway to the begin"
          label="In development"
          featuresElements={listElements}
          buttonLabel="Learn more"
          connected
        />
      </Container>
    )
  })
  .add("Not Connected", () => {
    const listElements = [
      "Acoustic music",
      "Uplifting lyrics",
      "We've made it our manifesto",
    ]
    return (
      <Container>
        <ProductCard
          url={"https://www.mudita.com/"}
          imageSource={NickLewis}
          title="Nick Lewis Album"
          subtitle="Halfway to the begin"
          label="In development"
          featuresElements={listElements}
          buttonLabel="Learn more"
        />
      </Container>
    )
  })
