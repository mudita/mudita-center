import { storiesOf } from "@storybook/react"
import * as React from "react"
import Image from "./image.component"

storiesOf("Components|Image", module).add("Text", () => {
  return <Image src="http://placekitten.com/g/200/300" alt="Kitku" />
})
