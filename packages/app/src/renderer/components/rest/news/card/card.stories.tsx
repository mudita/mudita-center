/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import Card from "Renderer/components/rest/news/card/card.component"
import styled from "styled-components"
import { text, withKnobs } from "@storybook/addon-knobs"

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

storiesOf("News/Card", module)
  .addDecorator(withKnobs)
  .add("Card", () => {
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
        />
      </Container>
    )
  })
