/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import Cards from "App/news/components/cards/cards.component"
import { mockedNewsItems } from "App/news/__mocks__/mocked-news-items"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

storiesOf("News/Cards", module).add("Cards", () => {
  return (
    <Container>
      <Cards newsItems={mockedNewsItems} />
    </Container>
  )
})
