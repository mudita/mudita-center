/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import Avatar, {
  AvatarSize,
} from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"

const avatarUser = {
  firstName: "John",
  lastName: "Doe",
}

storiesOf("Components|Core/Avatar", module).add("Default", () => (
  <>
    <StoryContainer title="Sizes">
      <Story title="Small">
        <Avatar size={AvatarSize.Small} user={avatarUser} />
      </Story>
      <Story title="Medium">
        <Avatar size={AvatarSize.Medium} user={avatarUser} />
      </Story>
      <Story title="Big">
        <Avatar size={AvatarSize.Big} user={avatarUser} />
      </Story>
    </StoryContainer>
    <StoryContainer title="Themes">
      <Story title="Light" darkMode>
        <Avatar user={avatarUser} light />
      </Story>
      <Story title="Dark">
        <Avatar user={avatarUser} />
      </Story>
    </StoryContainer>
    <StoryContainer title="Types">
      <Story title="Text (initials)">
        <Avatar user={avatarUser} />
      </Story>
      <Story title="Image">
        <Avatar imageSrc="http://placekitten.com/200/200" />
      </Story>
      <Story title="Default">
        <Avatar />
      </Story>
    </StoryContainer>
  </>
))
