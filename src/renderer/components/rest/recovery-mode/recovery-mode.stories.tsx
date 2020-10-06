import { storiesOf } from "@storybook/react"
import React from "react"
import RecoveryMode from "Renderer/modules/recovery-mode/recovery-mode.component"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import styled from "styled-components"

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  align-items: stretch;
  justify-items: stretch;
`
storiesOf("Views/Recovery Mode", module).add("Welcome", () => {
  return (
    <Wrapper>
      <Router history={history}>
        <RecoveryMode />
      </Router>
    </Wrapper>
  )
})
