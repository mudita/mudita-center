/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import type { Meta, StoryObj } from "@storybook/react"
import { storybookHelper } from "app-theme/utils"
import { IconType } from "app-theme/models"
import { colorsList } from "../shared/color-list"
import { Badge } from "./badge"

const Decorator = styled.div`
  align-self: center;
  justify-self: center;
  width: 32rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
`

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Badge component is used to display a small piece of information, typically an icon and text, in a compact format.",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  argTypes: {
    icon: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the icon displayed inside the button, on the left side of the text."
      )
      .generateEnumSelector(IconType, "IconType", { optional: true })
      .apply(),
    color: storybookHelper
      .assignCategory("Styles")
      .addDescription("Defines custom text color.")
      .setType("AppColor")
      .apply({
        options: colorsList.map((color) => color.name),
        control: {
          type: "select",
        },
      }),
    backgroundColor: storybookHelper
      .assignCategory("Styles")
      .addDescription("Defines custom background color.")
      .setType("AppColor")
      .apply({
        options: colorsList.map((color) => color.name),
        control: {
          type: "select",
        },
      }),
  },
  args: {
    message: "menu.app.title",
  },
  parameters: {
    docs: {
      source: {
        code: `<Badge>Default badge</Badge>`,
      },
    },
  },
}
