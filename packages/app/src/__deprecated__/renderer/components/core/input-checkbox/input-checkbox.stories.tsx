/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import InputCheckbox, {
  CheckboxTooltipDescription,
  Size,
} from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"

const checkboxTooltipDescription: CheckboxTooltipDescription = {
  uncheckTooltipDescription: { id: "Check input" },
  checkTooltipDescription: { id: "Uncheck input" },
}

storiesOf("Components|Core/InputCheckbox", module).add("Default", () => (
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
      <Story title="With tolltip">
        <InputCheckbox
          checkboxTooltipDescription={checkboxTooltipDescription}
        />
      </Story>
    </StoryContainer>
  </>
))
