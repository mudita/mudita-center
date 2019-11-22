import { storiesOf } from "@storybook/react"
import * as React from "react"
import InputCheckbox from "Renderer/components/input-checkbox/input-checkbox.component"

storiesOf("Components|Input", module).add("Checkbox", () => {
  return (
    <form action="">
      <InputCheckbox
        name={"Example1"}
        value={"value1"}
        id={"id1"}
        defaultChecked
      />
      <InputCheckbox
        name={"Example1"}
        value={"value2"}
        id={"id2"}
        label="Example label"
      />
    </form>
  )
})
