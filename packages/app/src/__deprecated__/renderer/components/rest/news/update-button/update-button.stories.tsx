/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import UpdateButtonComponent from "App/__deprecated__/renderer/components/rest/news/update-button/update-button.component"
import styled from "styled-components"

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

storiesOf("News/Update Button", module)
  .add("Updating", () => {
    return (
      <Container>
        <UpdateButtonComponent updating />
      </Container>
    )
  })
  .add("Default state", () => {
    return (
      <Container>
        <UpdateButtonComponent />
      </Container>
    )
  })
