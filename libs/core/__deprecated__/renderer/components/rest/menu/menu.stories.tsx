/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import styled from "styled-components"
import Menu from "Core/__deprecated__/renderer/components/rest/menu/menu.component"

const Container = styled.div`
  width: 31.5rem;
`

storiesOf("Components/Menu", module).add("Menu", () => {
  return (
    <Router>
      <Container>
        <Menu />
      </Container>
    </Router>
  )
})
