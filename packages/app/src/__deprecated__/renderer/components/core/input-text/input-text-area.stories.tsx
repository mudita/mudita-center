/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import InputComponent from "App/__deprecated__/renderer/components/core/input-text/input-text.component"
import { Icon } from "App/__deprecated__/renderer/components/core/input-text/input-text.stories"
import { textAreaContainerStyles } from "App/__deprecated__/renderer/components/core/input-text/input-text-shared.stories"

export default {
  title: 'Components|Core/Text input/Text area',
};

export const TextAreaView = () => (
  <>
    <StoryContainer title="Themes" customStyle={textAreaContainerStyles}>
      <Story title="Default">
        <InputComponent type="textarea" label="Message" />
      </Story>
    </StoryContainer>
    <StoryContainer title="Modifiers" customStyle={textAreaContainerStyles}>
      <Story title="With label">
        <InputComponent type="textarea" label="Message" />
      </Story>
      <Story title="With value">
        <InputComponent
          defaultValue={
            "Curabitur ac lectus.\n\nAliquet quam id dui posuere blandit."
          }
          type="textarea"
          label="Message"
        />
      </Story>
      <Story title="With error">
        <InputComponent
          type="textarea"
          label="Message"
          defaultValue={
            "Curabitur ac lectus.\n\nAliquet quam id dui posuere blandit."
          }
          errorMessage="Text is too long"
        />
      </Story>
      <Story title="Disabled with value">
        <InputComponent
          type="textarea"
          label="Message"
          defaultValue={
            "Curabitur ac lectus.\n\nAliquet quam id dui posuere blandit."
          }
          disabled
        />
      </Story>
      <Story title="With rows limit set to 3">
        <InputComponent
          type="textarea"
          label="Message"
          defaultValue={
            "Curabitur ac lectus.\n\nAliquet quam id dui posuere blandit."
          }
          maxRows={3}
        />
      </Story>
    </StoryContainer>
    <StoryContainer title="Customizations">
      <Story title="With leading icon">
        <InputComponent
          type="textarea"
          leadingIcons={[<Icon key={1} />]}
          label="Message"
        />
      </Story>
      <Story title="With trailing icon">
        <InputComponent
          type="textarea"
          trailingIcons={[<Icon key={1} />]}
          label="Message"
        />
      </Story>
      <Story title={"With leading \n and trailing icons"}>
        <InputComponent
          type="textarea"
          leadingIcons={[<Icon key={1} />]}
          trailingIcons={[<Icon key={1} />]}
          label="Message"
        />
      </Story>
      <Story title={"With multiple leading \n and trailing icons"}>
        <InputComponent
          type="textarea"
          leadingIcons={[<Icon key={1} />, <Icon key={2} />]}
          trailingIcons={[<Icon key={1} />, <Icon key={2} />]}
          label="Message"
        />
      </Story>
    </StoryContainer>
  </>
);

TextAreaView.story = {
  name: "Text Area view",
}

