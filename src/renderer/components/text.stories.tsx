import { storiesOf } from "@storybook/react"
import * as React from "react"
import Text, { TextDisplayStyle } from "./text.component"

storiesOf("Text", module).add("Text", () => {
  return (
    <Text
      stringId={"test.string"}
      displayStyle={TextDisplayStyle.SmallTextInverted}
    />
  )
})
