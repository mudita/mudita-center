import { storiesOf } from "@storybook/react"
import React from "react"
import RecoveryMode from "Renderer/modules/recovery-mode/recovery-mode.component"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import styled from "styled-components"
import { noop } from "Renderer/utils/noop"

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  align-items: stretch;
  justify-items: stretch;
`
storiesOf("Views/Recovery Mode", module).add("Main view", () => {
  return (
    <Wrapper>
      <Router history={history}>
        <RecoveryMode
          onSupportButtonClick={noop}
          onBackupClick={noop}
          onRebootOsClick={noop}
          onRestoreClick={noop}
          onFactoryResetClick={noop}
        />
      </Router>
    </Wrapper>
  )
})
