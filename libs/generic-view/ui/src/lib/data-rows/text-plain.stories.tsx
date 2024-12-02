/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { TextPlain as TextPlainComponent } from "./text-plain"

const meta: Meta<typeof TextPlainComponent> = {
  title: "Data rows",
  component: TextPlainComponent,
}

export default meta
type Story = StoryObj<typeof TextPlainComponent>

export const TextPlain: Story = {
  args: {
    data: {
      text: "Hello World",
    },
  },
}
