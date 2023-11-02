import React from "react"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import PureDisconnected from "App/__deprecated__/renderer/modules/tethering/screens/pure-disconnected.component"
import { Router } from "react-router"
import history from "App/__deprecated__/renderer/routes/history"
import TetheringEnabled from "App/__deprecated__/renderer/modules/tethering/screens/tethering-enabled.component"
import TetheringDisabled from "App/__deprecated__/renderer/modules/tethering/screens/tethering-disabled.component"

export default {
  title: "Views/Tethering",
}

export const _PureDisconnected = () => {
  return (
    <StoryContainer>
      <Router history={history}>
        <PureDisconnected />
      </Router>
    </StoryContainer>
  )
}

export const _TetheringEnabled = () => {
  return (
    <StoryContainer>
      <Router history={history}>
        <TetheringEnabled />
      </Router>
    </StoryContainer>
  )
}

export const _TetheringDisabled = () => {
  return (
    <StoryContainer>
      <Router history={history}>
        <TetheringDisabled />
      </Router>
    </StoryContainer>
  )
}
