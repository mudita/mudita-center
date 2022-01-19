/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import { Router } from "react-router"
import FilesSummary from "App/files-manager/components/files-summary/files-summary.component"
import history from "Renderer/routes/history"
import styled from "styled-components"

const memorySpace = {
  free: 60,
  full: 100,
}

const Container = styled.div`
  width: 98.5rem;
`

storiesOf("Components/Files Summary", module).add("FilesSummary", () => {
  return (
    <Router history={history}>
      <Container>
        <FilesSummary memorySpace={memorySpace} />
      </Container>
    </Router>
  )
})
