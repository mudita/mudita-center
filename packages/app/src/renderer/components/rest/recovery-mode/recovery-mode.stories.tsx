import { storiesOf } from "@storybook/react"
import React from "react"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import styled from "styled-components"
import { noop } from "Renderer/utils/noop"
import RecoveryModeUI from "Renderer/modules/recovery-mode/recovery-mode-ui.component"

const Wrapper = styled.div`
  max-width: 97.5rem;
`
storiesOf("Views/Recovery Mode", module).add("Main view", () => {
  return (
    <Wrapper>
      <Router history={history}>
        <RecoveryModeUI
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
