/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import Badge from "App/__deprecated__/renderer/components/core/badge/badge.component"

storiesOf("Components|Core/Badge", module).add("Default", () => (
  <StoryContainer title="Badge">
    <Story title="Default">
      <Badge>+1</Badge>
    </Story>
  </StoryContainer>
))
