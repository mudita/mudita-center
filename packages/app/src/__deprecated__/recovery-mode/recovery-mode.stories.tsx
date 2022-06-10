/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import { Router } from "react-router"
import history from "App/__deprecated__/renderer/routes/history"
import styled from "styled-components"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import RecoveryModeUI from "App/__deprecated__/recovery-mode/recovery-mode-ui.component"

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
