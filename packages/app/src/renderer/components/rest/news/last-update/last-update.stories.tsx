/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import LastUpdate from "Renderer/components/rest/news/last-update/last-update.component"

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

storiesOf("News/Last Update", module)
  .add("Offline", () => {
    return (
      <Container>
        <LastUpdate online date="2019-10-18T11:27:15.256Z" />
      </Container>
    )
  })
  .add("Online", () => {
    return (
      <Container>
        <LastUpdate online={false} date="2019-10-18T11:27:15.256Z" />
      </Container>
    )
  })
  .add("First use of app without internet connection", () => {
    return (
      <Container>
        <LastUpdate online />
      </Container>
    )
  })
