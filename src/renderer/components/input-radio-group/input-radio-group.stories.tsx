import { storiesOf } from "@storybook/react"
import * as React from "react"
import InputRadioGroup from "Renderer/components/input-radio-group/input-radio-group.component"
import styled from "styled-components"

const radioGroup = [
  {
    value: "lala1",
    id: "id1",
    label: "label",
    subLabel: "sublabel",
  },
  {
    value: "lala2",
    id: "id2",
    label: "label",
    subLabel: "sublabel",
  },
  {
    value: "lala2",
    id: "id3",
    label: "label",
    subLabel: "sublabel",
  },
  {
    value: "lala2",
    id: "id4",
    label: "label",
    subLabel: "sublabel",
  },
]

const ColumnRadioGroup = styled(InputRadioGroup)`
  flex-direction: column;
`

storiesOf("Components|InputRadioGroup ", module)
  .add("Row", () => {
    return (
      <InputRadioGroup data={radioGroup} radioGroupName={"radiogroupname"} />
    )
  })
  .add("Column", () => {
    return (
      <ColumnRadioGroup data={radioGroup} radioGroupName={"radiogroupname"} />
    )
  })
