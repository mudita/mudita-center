/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import PureDisconnected from "App/__deprecated__/renderer/modules/tethering/screens/pure-disconnected.component"
import { Router } from "react-router"
import history from "App/__deprecated__/renderer/routes/history"
import TetheringEnabled from "App/__deprecated__/renderer/modules/tethering/screens/tethering-enabled.component"
import TetheringDisabled from "App/__deprecated__/renderer/modules/tethering/screens/tethering-disabled.component"

storiesOf("Views/Tethering", module)
  .add("Pure Disconnected", () => {
    return (
      <StoryContainer>
        <Router history={history}>
          <PureDisconnected />
        </Router>
      </StoryContainer>
    )
  })
  .add("Tethering Enabled", () => {
    return (
      <StoryContainer>
        <Router history={history}>
          <TetheringEnabled />
        </Router>
      </StoryContainer>
    )
  })
  .add("Tethering Disabled", () => {
    return (
      <StoryContainer>
        <Router history={history}>
          <TetheringDisabled />
        </Router>
      </StoryContainer>
    )
  })
