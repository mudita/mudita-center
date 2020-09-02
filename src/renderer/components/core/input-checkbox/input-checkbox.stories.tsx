import { storiesOf } from "@storybook/react"
import * as React from "react"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Story from "Renderer/components/storybook/story.component"
import StoryContainer from "Renderer/components/storybook/story-container.component"

storiesOf("Components/Core/InputCheckbox", module).add("Default", () => (
  <>
    <StoryContainer title="Sizes">
      <Story title="Large (default)">
        <InputCheckbox />
      </Story>
      <Story title="Medium">
        <InputCheckbox size={Size.Medium} />
      </Story>
      <Story title="Small">
        <InputCheckbox size={Size.Small} />
      </Story>
    </StoryContainer>
    <StoryContainer>
      <Story title="Large (default)">
        <InputCheckbox defaultChecked />
      </Story>
      <Story title="Medium">
        <InputCheckbox defaultChecked size={Size.Medium} />
      </Story>
      <Story title="Small">
        <InputCheckbox defaultChecked size={Size.Small} />
      </Story>
    </StoryContainer>
    <StoryContainer title="States">
      <Story title="Unchecked (default)">
        <InputCheckbox />
      </Story>
      <Story title="Checked">
        <InputCheckbox defaultChecked />
      </Story>
      <Story title="Indeterminate">
        <InputCheckbox indeterminate />
      </Story>
    </StoryContainer>
    <StoryContainer title="Types">
      <Story title="Default">
        <InputCheckbox />
      </Story>
      <Story title="With label">
        <InputCheckbox label="Label" />
      </Story>
    </StoryContainer>
  </>
))
