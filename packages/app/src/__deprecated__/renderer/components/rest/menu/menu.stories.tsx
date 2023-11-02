import * as React from "react"
import { Router } from "react-router"
import Menu from "App/__deprecated__/renderer/components/rest/menu/menu.component"
import history from "App/__deprecated__/renderer/routes/history"
import styled from "styled-components"

const Container = styled.div`
  width: 31.5rem;
`

export default {
  title: "Components/Menu",
}

export const _Menu = () => {
  return (
    <Router history={history}>
      <Container>
        <Menu />
      </Container>
    </Router>
  )
}
