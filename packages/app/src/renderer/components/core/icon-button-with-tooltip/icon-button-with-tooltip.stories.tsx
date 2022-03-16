/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { storiesOf } from "@storybook/react"
import { Type } from "Renderer/components/core/icon/icon.config"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import { IconButtonWithPrimaryTooltip } from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-primary-tooltip.component"
import { IconButtonWithSecondaryTooltip } from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-secondary-tooltip.component"

storiesOf("Components|Core/IconButtonWithTooltip", module).add(
  "Default",
  () => (
    <>
      <StoryContainer title="Primary">
        <Story title="Default">
          <IconButtonWithPrimaryTooltip
            description={{ id: "Tooltip description" }}
          />
        </Story>
        <Story title="With title">
          <IconButtonWithPrimaryTooltip
            title={{ id: "Tooltip title" }}
            description={{ id: "Tooltip description" }}
          />
        </Story>
        <Story title="With different icon">
          <IconButtonWithPrimaryTooltip
            iconType={Type.MuditaFlower}
            description={{ id: "Tooltip description" }}
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Secondary">
        <Story title="Default">
          <IconButtonWithSecondaryTooltip
            description={{ id: "Tooltip description" }}
          />
        </Story>
        <Story title="With different icon">
          <IconButtonWithSecondaryTooltip
            iconType={Type.MuditaFlower}
            description={{ id: "Tooltip description" }}
          />
        </Story>
      </StoryContainer>
    </>
  )
)
