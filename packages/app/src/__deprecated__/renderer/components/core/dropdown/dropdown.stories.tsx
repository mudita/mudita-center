import * as React from "react"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DropdownButton } from "App/__deprecated__/renderer/components/core/dropdown/dropdown-button.styled"
import Dropdown, {
  DropdownPosition,
} from "App/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "../../storybook/story.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

export default {
  title: "Components|Core/Dropdown",
}

export const Default = () => (
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
)
