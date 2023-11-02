/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import InputComponent from "App/__deprecated__/renderer/components/core/input-text/input-text.component"

export default {
  title: 'Components|Core/Text input/Passcode',
};

export const PasscodeView = () => (
  <>
    <StoryContainer title="Themes">
      <Story title="Default">
        <InputComponent type="passcode" />
      </Story>
    </StoryContainer>
    <StoryContainer title="Modifiers">
      <Story title="Disabled with value">
        <InputComponent type="passcode" disabled defaultValue="3" />
      </Story>
      <Story title="With error">
        <InputComponent defaultValue="3" type="passcode" error />
      </Story>
    </StoryContainer>
  </>
);

PasscodeView.story = {
  name: "Passcode view",
}
