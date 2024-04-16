/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import styled from "styled-components"
import Tabs from "Core/__deprecated__/renderer/components/rest/header/tabs.component"

const Container = styled.div`
  width: 35rem;
`

storiesOf("Components/Tabs", module).add("Phone view", () => {
  return (
    <Router>
      <Container>
        <Tabs currentLocation="/phone" />
      </Container>
    </Router>
  )
})
