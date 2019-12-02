import { storiesOf } from "@storybook/react"
import * as React from "react"
import InputRadioGroup from "Renderer/components/input-radio-group/input-radio-group.component"

const radioGroup = [
  {
    value: "lala1",
    id: "id1",
  },
  {
    value: "lala2",
    id: "id2",
  },
  {
    value: "lala2",
    id: "id3",
  },
  {
    value: "lala2",
    id: "id4",
  },
]

storiesOf("Components|InputRadioGroup ", module).add("Checked", () => {
  return <InputRadioGroup data={radioGroup} radioGroupName={"radiogroupname"} />
})
