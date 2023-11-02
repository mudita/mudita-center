import * as React from "react"
import Image from "./image.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"

export default {
  title: "Components|Core/Image",
}

export const Default = () => (
  <Story transparentMode>
    <Image src="http://placekitten.com/g/200/300" alt="Kitku" />
  </Story>
)
