/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import { storyContainerStyles } from "App/__deprecated__/renderer/components/core/input-text/input-text-shared.stories"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import InputComponent from "App/__deprecated__/renderer/components/core/input-text/input-text.component"
import { searchIcon } from "App/__deprecated__/renderer/components/core/input-text/input-text.elements"

export default {
  title: 'Components|Core/Text input/Search',
  excludeStories: ['Icon'],
};

export const TextSearchView = () => (
  <StoryContainer customStyle={storyContainerStyles}>
    <Story>
      <InputComponent
        type="search"
        leadingIcons={[searchIcon]}
        outlined
        condensed
      />
    </Story>
  </StoryContainer>
);

TextSearchView.story = {
  name: "Text Search view",
}

