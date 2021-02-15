import { storiesOf } from "@storybook/react"
import * as React from "react"
import { Router } from "react-router"
import Menu from "Renderer/components/rest/menu/menu.component"
import history from "Renderer/routes/history"
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
