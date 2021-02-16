/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import InputRadio from "Renderer/components/core/input-radio/input-radio.component"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"

storiesOf("Components|Core/InputRadio", module).add("Default", () => (
  <>
    <StoryContainer title="States">
      <Story title="Unchecked (default)">
        <InputRadio />
      </Story>
      <Story title="Checked">
        <InputRadio defaultChecked />
      </Story>
    </StoryContainer>
    <StoryContainer title="Types">
      <Story title="Default">
        <InputRadio />
      </Story>
      <Story title="With label">
        <InputRadio label="Label" />
      </Story>
    </StoryContainer>
  </>
))
