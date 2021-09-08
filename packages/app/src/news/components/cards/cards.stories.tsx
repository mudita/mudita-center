/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import Cards from "App/news/components/cards/cards.component"
import { newsItems } from "App/news/components/cards/cards-mock-data"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

storiesOf("News/Cards", module).add("Cards", () => {
  return (
    <Container>
      <Cards newsItems={newsItems} />
    </Container>
  )
})
