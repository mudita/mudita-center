import { storiesOf } from "@storybook/react"
import * as React from "react"
import { Router } from "react-router"
import Tabs from "Renderer/components/rest/header/tabs.component"
import history from "Renderer/routes/history"
import styled from "styled-components"

const Container = styled.div`
  width: 35rem;
`

storiesOf("Components", module).add("Tabs", () => {
  return (
    <Router history={history}>
      <Container>
        <Tabs currentLocation="/phone" />
      </Container>
    </Router>
  )
})
