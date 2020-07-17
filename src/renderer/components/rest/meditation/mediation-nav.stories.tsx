import { storiesOf } from "@storybook/react"
import React from "react"
// import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"

import Nav from "Renderer/components/rest/meditation/meditation-nav.component"

storiesOf("Components|Meditation", module).add("Navigation", () => (
  <Story title="With date passed as string">
    <Nav startDate="10.10.10" endDate="10.10.10" />
  </Story>
))
