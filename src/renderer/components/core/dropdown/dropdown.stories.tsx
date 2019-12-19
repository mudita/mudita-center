import { storiesOf } from "@storybook/react"
import * as React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import DropdownItem from "Renderer/components/core/dropdown/dropdown-item.component"
import Dropdown, {
  Size,
} from "Renderer/components/core/dropdown/dropdown.component"
import Upload from "Renderer/svg/upload.svg"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

storiesOf("Components|Dropdown", module).add("Dropdown", () => {
  return (
    <Wrapper>
      <Dropdown
        size={Size.S}
        toggler={<ButtonComponent label={"Click dropdown"} />}
      >
        <DropdownItem Icon={Upload} text={"Export"} />
        <DropdownItem Icon={Upload} text={"Export"} />
        <DropdownItem Icon={Upload} text={"Export"} />
      </Dropdown>
    </Wrapper>
  )
})
