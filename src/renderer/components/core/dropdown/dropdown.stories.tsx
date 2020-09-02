import { storiesOf } from "@storybook/react"
import * as React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DropdownButton } from "Renderer/components/core/dropdown/dropdown-button.styled"
import Dropdown, {
  DropdownPosition,
} from "Renderer/components/core/dropdown/dropdown.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "../../storybook/story.component"

storiesOf("Components/Core/Dropdown", module).add("Default", () => (
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
          Icon={Type.Upload}
        />
        <DropdownButton
          label="I open Google in new tab"
          href="http://www.google.pl"
          target="_blank"
          Icon={Type.Upload}
        />
        <DropdownButton
          label="I open Google in new tab"
          href="http://www.google.pl"
          target="_blank"
          Icon={Type.Upload}
        />
      </Dropdown>
    </Story>
    <Story title="Aligned to the right">
      <Dropdown toggler={<ButtonComponent label={"Click dropdown"} />}>
        <DropdownButton
          label="I open Google in new tab"
          href="http://www.google.pl"
          target="_blank"
          Icon={Type.Upload}
        />
        <DropdownButton
          label="I open Google in new tab"
          href="http://www.google.pl"
          target="_blank"
          Icon={Type.Upload}
        />
        <DropdownButton
          label="I open Google in new tab"
          href="http://www.google.pl"
          target="_blank"
          Icon={Type.Upload}
        />
      </Dropdown>
    </Story>
  </StoryContainer>
))
