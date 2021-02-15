/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import Image from "./image.component"
import Story from "Renderer/components/storybook/story.component"

storiesOf("Components|Core/Image", module).add("Default", () => (
  <Story transparentMode>
    <Image src="http://placekitten.com/g/200/300" alt="Kitku" />
  </Story>
))
