/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import { Router } from "react-router"
import Menu from "Core/__deprecated__/renderer/components/rest/menu/menu.component"
import history from "Core/core/routes/history"
import styled from "styled-components"

const Container = styled.div`
  width: 31.5rem;
`

storiesOf("Components/Menu", module).add("Menu", () => {
  return (
    <Router history={history}>
      <Container>
        <Menu />
      </Container>
    </Router>
  )
})