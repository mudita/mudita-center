import React from "react"
import { storiesOf } from "@storybook/react"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import Badge from "Renderer/components/core/badge/badge.component"

storiesOf("Components|Core/Badge", module).add("Default", () => (
  <StoryContainer title="Badge">
    <Story title="Default">
      <Badge>+1</Badge>
    </Story>
  </StoryContainer>
))
