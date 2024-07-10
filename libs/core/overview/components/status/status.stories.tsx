/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import { DeviceType } from "device-protocol/models"
import Status from "Core/overview/components/status/status.component"
import { css } from "styled-components"
import StoryContainer from "Core/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "Core/__deprecated__/renderer/components/storybook/story.component"

const storyStyle = css`
  > * {
    width: 63rem;
  }
`

storiesOf("Views|Overview/Status ", module)
  .add("Status Pure", () => {
    return (
      <StoryContainer column>
        <Story title="Status card" customStyle={storyStyle}>
          <Status
            deviceType={DeviceType.MuditaPure}
            batteryLevel={0.75}
            network={"Play"}
            networkLevel={0.75}
          />
        </Story>
      </StoryContainer>
    )
  })
  .add("Status Harmony", () => {
    return (
      <StoryContainer column>
        <Story title="Status card" customStyle={storyStyle}>
          <Status
            deviceType={DeviceType.MuditaHarmony}
            batteryLevel={0.75}
            network={"Play"}
            networkLevel={0.75}
          />
        </Story>
      </StoryContainer>
    )
  })
