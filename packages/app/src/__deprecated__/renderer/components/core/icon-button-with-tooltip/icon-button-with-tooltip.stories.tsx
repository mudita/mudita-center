/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { storiesOf } from "@storybook/react"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { IconButtonWithPrimaryTooltip } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-primary-tooltip.component"
import { IconButtonWithSecondaryTooltip } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-secondary-tooltip.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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
            iconType={IconType.MuditaFlower}
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
            iconType={IconType.MuditaFlower}
            description={{ id: "Tooltip description" }}
          />
        </Story>
      </StoryContainer>
    </>
  )
)
