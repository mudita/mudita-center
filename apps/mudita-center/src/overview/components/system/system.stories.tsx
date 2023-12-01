/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import System from "App/overview/components/system/system.component"
import { action } from "@storybook/addon-actions"
import { css } from "styled-components"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { DeviceType } from "App/device"

const storyStyle = css`
  > * {
    height: 20.5rem;
    width: 62rem;
  }
`

storiesOf("Views|Overview/System", module).add("System", () => {
  return (
    <StoryContainer column>
      <Story title="New update available" customStyle={storyStyle}>
        <System
          deviceType={DeviceType.MuditaPure}
          osVersion={"1.0.0"}
          onUpdate={action("update requested")}
        />
      </Story>
      <Story title="Update available and downloaded" customStyle={storyStyle}>
        <System
          deviceType={DeviceType.MuditaPure}
          osVersion={"1.0.0"}
          onUpdate={action("update requested")}
        />
      </Story>
      <Story title="System up to date" customStyle={storyStyle}>
        <System
          deviceType={DeviceType.MuditaPure}
          osVersion={"1.0.0"}
          onUpdate={action("update requested")}
        />
      </Story>
      <Story title="Update failed" customStyle={storyStyle}>
        <System
          deviceType={DeviceType.MuditaPure}
          osVersion={"1.0.0"}
          onUpdate={action("update requested")}
        />
      </Story>
      <Story title="Check for update in progress" customStyle={storyStyle}>
        <System
          deviceType={DeviceType.MuditaPure}
          osVersion={"1.0.0"}
          onUpdate={action("update requested")}
        />
      </Story>
    </StoryContainer>
  )
})
