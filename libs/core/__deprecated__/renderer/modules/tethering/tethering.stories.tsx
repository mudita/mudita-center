/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import StoryContainer from "Core/__deprecated__/renderer/components/storybook/story-container.component"
import PureDisconnected from "Core/__deprecated__/renderer/modules/tethering/screens/pure-disconnected.component"
import TetheringEnabled from "Core/__deprecated__/renderer/modules/tethering/screens/tethering-enabled.component"
import TetheringDisabled from "Core/__deprecated__/renderer/modules/tethering/screens/tethering-disabled.component"

storiesOf("Views/Tethering", module)
  .add("Pure Disconnected", () => {
    return (
      <StoryContainer>
        <Router>
          <PureDisconnected />
        </Router>
      </StoryContainer>
    )
  })
  .add("Tethering Enabled", () => {
    return (
      <StoryContainer>
        <Router>
          <TetheringEnabled />
        </Router>
      </StoryContainer>
    )
  })
  .add("Tethering Disabled", () => {
    return (
      <StoryContainer>
        <Router>
          <TetheringDisabled />
        </Router>
      </StoryContainer>
    )
  })
