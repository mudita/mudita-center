import * as React from "react"
import { Router } from "react-router"
import Tabs from "App/__deprecated__/renderer/components/rest/header/tabs.component"
import history from "App/__deprecated__/renderer/routes/history"
import styled from "styled-components"

const Container = styled.div`
  width: 35rem;
`

export default {
  title: "Components/Tabs",
}

export const PhoneView = () => {
  return (
    <Router history={history}>
      <Container>
        <Tabs currentLocation="/phone" />
      </Container>
    </Router>
  )
}

PhoneView.story = {
  name: "Phone view",
}
