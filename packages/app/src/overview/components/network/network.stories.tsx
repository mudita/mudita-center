/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import Network from "App/overview/components/network/network.component"
import { css } from "styled-components"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"

const storyStyle = css`
  > * {
    width: 63rem;
  }
`

storiesOf("Views|Overview/Network ", module).add("Network", () => {
  return (
    <StoryContainer column>
      <Story title="Network card" customStyle={storyStyle}>
        <Network batteryLevel={0.75} network={"Play"} networkLevel={0.75} />
      </Story>
    </StoryContainer>
  )
})
