import { storiesOf } from "@storybook/react"
import * as React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DropdownButton } from "Renderer/components/core/dropdown/dropdown-button.styled"
import Dropdown, {
  DropdownPosition,
} from "Renderer/components/core/dropdown/dropdown.component"
import Upload from "Renderer/svg/upload.svg"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

storiesOf("Components|Dropdown", module)
  .add("Right", () => {
    return (
      <Wrapper>
        <Dropdown
          dropdownPosition={DropdownPosition.Right}
          toggler={<ButtonComponent label={"Click dropdown"} />}
        >
          <DropdownButton
            label="I open Google in new tab"
            href="http://www.google.pl"
            target="_blank"
            Icon={Upload}
          />
          <DropdownButton
            label="I open Google in new tab"
            href="http://www.google.pl"
            target="_blank"
            Icon={Upload}
          />
          <DropdownButton
            label="I open Google in new tab"
            href="http://www.google.pl"
            target="_blank"
            Icon={Upload}
          />
        </Dropdown>
      </Wrapper>
    )
  })
  .add("Left", () => {
    return (
      <Wrapper>
        <Dropdown
          dropdownPosition={DropdownPosition.Left}
          toggler={<ButtonComponent label={"Click dropdown"} />}
        >
          <DropdownButton
            label="I open Google in new tab"
            href="http://www.google.pl"
            target="_blank"
            Icon={Upload}
          />
          <DropdownButton
            label="I open Google in new tab"
            href="http://www.google.pl"
            target="_blank"
            Icon={Upload}
          />
          <DropdownButton
            label="I open Google in new tab"
            href="http://www.google.pl"
            target="_blank"
            Icon={Upload}
          />
        </Dropdown>
      </Wrapper>
    )
  })
