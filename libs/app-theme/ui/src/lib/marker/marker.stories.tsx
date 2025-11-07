/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { Marker } from "./marker"

const meta: Meta<typeof Marker> = {
  title: "UI/Marker",
  component: Marker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `<Marker />` component renders a simple circular marker with a given color.",
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Marker>

export const Default: Story = {
  args: {
    $color: "#E38577",
    style: { width: "1rem" },
  },
}
