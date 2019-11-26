import { storiesOf } from "@storybook/react"
import * as React from "react"
import InputCheckbox from "Renderer/components/input-checkbox/input-checkbox.component"

storiesOf("Components|InputCheckbox", module)
  .add("Checked", () => {
    return (
      <InputCheckbox
        name={"Example1"}
        value={"value1"}
        id={"id1"}
        defaultChecked
      />
    )
  })
  .add("Unchecked", () => {
    return <InputCheckbox name={"Example1"} value={"value2"} id={"id2"} />
  })
