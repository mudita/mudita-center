import { storiesOf } from "@storybook/react"
import * as React from "react"
import InputRadioGroup from "Renderer/components/input-radio-group/input-radio-group.component"

const radioGroup = [
  {
    name: "lala1",
  },
  {
    name: "lala2",
  },
  {
    name: "lala2",
  },
  {
    name: "lala2",
  },
]

storiesOf("Components|InputRadioGroup ", module).add("Checked", () => {
  return <InputRadioGroup data={radioGroup} />
})
