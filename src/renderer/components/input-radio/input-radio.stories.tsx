import { storiesOf } from "@storybook/react"
import * as React from "react"
import InputRadio from "Renderer/components/input-radio/input-radio.component"

storiesOf("Components|InputRadio ", module)
  .add("Checked", () => {
    return (
      <InputRadio
        name={"Example1"}
        value={"value1"}
        id={"id1"}
        defaultChecked
      />
    )
  })
  .add("Unchecked", () => {
    return <InputRadio name={"Example1"} value={"value2"} id={"id2"} />
  })
