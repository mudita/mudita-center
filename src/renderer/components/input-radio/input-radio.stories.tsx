import { storiesOf } from "@storybook/react"
import * as React from "react"
import InputRadio from "Renderer/components/input-radio/input-radio.component"

storiesOf("Components|Input", module).add("Radio input", () => {
  return (
    <>
      <InputRadio />
      <InputRadio />
    </>
  )
})
