/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DropdownButton } from "Core/__deprecated__/renderer/components/core/dropdown/dropdown-button.styled"
import Dropdown, {
  DropdownPosition,
} from "Core/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import StoryContainer from "Core/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "../../storybook/story.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

storiesOf("Components|Core/Dropdown", module).add("Default", () => (
  <StoryContainer>
    <Story title="Aligned to the left">
      <Dropdown
        dropdownPosition={DropdownPosition.Left}
        toggler={<ButtonComponent label={"Click dropdown"} />}
      >
        <DropdownButton
          label="I open Google in new tab"
          href="http://www.google.pl"
          target="_blank"
          Icon={IconType.Upload}
        />
        <DropdownButton
          label="I open Google in new tab"
          href="http://www.google.pl"
          target="_blank"
          Icon={IconType.Upload}
        />
        <DropdownButton
          label="I open Google in new tab"
          href="http://www.google.pl"
          target="_blank"
          Icon={IconType.Upload}
        />
      </Dropdown>
    </Story>
    <Story title="Aligned to the right">
      <Dropdown toggler={<ButtonComponent label={"Click dropdown"} />}>
        <DropdownButton
          label="I open Google in new tab"
          href="http://www.google.pl"
          target="_blank"
          Icon={IconType.Upload}
        />
        <DropdownButton
          label="I open Google in new tab"
          href="http://www.google.pl"
          target="_blank"
          Icon={IconType.Upload}
        />
        <DropdownButton
          label="I open Google in new tab"
          href="http://www.google.pl"
          target="_blank"
          Icon={IconType.Upload}
        />
      </Dropdown>
    </Story>
  </StoryContainer>
))
