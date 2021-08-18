/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import { Type } from "Renderer/components/core/icon/icon.config"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import Tooltip from "Renderer/components/core/tooltip/tooltip.component"

storiesOf("Components|Core/Tooltip", module).add("Default", () => (
  <StoryContainer title="Types">
    <Story title="With description">
      <Tooltip tooltipDescription={{ id: "Tooltip description" }} />
    </Story>
    <Story title="With description and title">
      <Tooltip
        tooltipDescription={{ id: "Tooltip description" }}
        tooltipTitle={{ id: "Tooltip title" }}
      />
    </Story>
    <Story title="With different icon">
      <Tooltip
        tooltipDescription={{ id: "Tooltip description" }}
        tooltipIconType={Type.MuditaFlower}
      />
    </Story>
    <Story title="With different icon size">
      <Tooltip
        tooltipDescription={{ id: "Tooltip description" }}
        iconSize={4}
      />
    </Story>
  </StoryContainer>
))
