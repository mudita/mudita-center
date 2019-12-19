import { storiesOf } from "@storybook/react"
import * as React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import DropdownItem from "Renderer/components/core/dropdown/dropdown-item.component"
import Dropdown, {
  Size,
} from "Renderer/components/core/dropdown/dropdown.component"
import Upload from "Renderer/svg/upload.svg"

storiesOf("Components|Dropdown", module).add("Dropdown", () => {
  return (
    <Dropdown
      size={Size.S}
      toggler={<ButtonComponent label={"Click dropdown"} />}
    >
      <DropdownItem Icon={Upload} text={"Export"} />
      <DropdownItem Icon={Upload} text={"Export"} />
      <DropdownItem Icon={Upload} text={"Export"} />
    </Dropdown>
  )
})
