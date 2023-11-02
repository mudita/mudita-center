import React from "react"
import { DeviceType } from "App/device/constants"
import Status from "App/overview/components/status/status.component"
import { css } from "styled-components"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"

const storyStyle = css`
  > * {
    width: 63rem;
  }
`

export default {
  title: "Views|Overview/Status ",
}

export const StatusPure = () => {
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
}

export const StatusHarmony = () => {
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
}
