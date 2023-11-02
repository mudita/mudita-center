import React from "react"
import { Router } from "react-router"
import history from "App/__deprecated__/renderer/routes/history"
import styled from "styled-components"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import RecoveryModeUI from "App/__deprecated__/recovery-mode/components/recovery-mode-ui.component"

const Wrapper = styled.div`
  max-width: 97.5rem;
`

export default {
  title: "Views/Recovery Mode",
}

export const MainView = () => {
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
}

MainView.story = {
  name: "Main view",
}
