import * as React from "react"
import InputRadio from "App/__deprecated__/renderer/components/core/input-radio/input-radio.component"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"

export default {
  title: "Components|Core/InputRadio",
}

export const Default = () => (
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
)
