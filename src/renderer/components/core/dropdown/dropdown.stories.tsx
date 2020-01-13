import { storiesOf } from "@storybook/react"
import * as React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DropdownButton } from "Renderer/components/core/dropdown/dropdown-button.styled"
import Dropdown, {
  DropdownPosition,
} from "Renderer/components/core/dropdown/dropdown.component"
import Upload from "Renderer/svg/upload.svg"
import styled from "styled-components"
import { DisplayStyle } from "../button/button.component"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

storiesOf("Components|Dropdown", module)
  .add("FromRightCornerToRight", () => {
    return (
      <Wrapper>
        <Dropdown
          dropdownPosition={DropdownPosition.FromRightCornerToRight}
          toggler={<ButtonComponent label={"Click dropdown"} />}
        >
          <DropdownButton
            displayStyle={DisplayStyle.Link1}
            label="I open Google in new tab"
            href="http://www.google.pl"
            target="_blank"
            Icon={Upload}
          />
          <DropdownButton
            displayStyle={DisplayStyle.Link1}
            label="I open Google in new tab"
            href="http://www.google.pl"
            target="_blank"
            Icon={Upload}
          />
          <DropdownButton
            displayStyle={DisplayStyle.Link1}
            label="I open Google in new tab"
            href="http://www.google.pl"
            target="_blank"
            Icon={Upload}
          />
        </Dropdown>
      </Wrapper>
    )
  })
  .add("FromRightCornerToLeft", () => {
    return (
      <Wrapper>
        <Dropdown
          dropdownPosition={DropdownPosition.FromRightCornerToLeft}
          toggler={<ButtonComponent label={"Click dropdown"} />}
        >
          <DropdownButton
            displayStyle={DisplayStyle.Link1}
            label="I open Google in new tab"
            href="http://www.google.pl"
            target="_blank"
            Icon={Upload}
          />
          <DropdownButton
            displayStyle={DisplayStyle.Link1}
            label="I open Google in new tab"
            href="http://www.google.pl"
            target="_blank"
            Icon={Upload}
          />
          <DropdownButton
            displayStyle={DisplayStyle.Link1}
            label="I open Google in new tab"
            href="http://www.google.pl"
            target="_blank"
            Icon={Upload}
          />
        </Dropdown>
      </Wrapper>
    )
  })
