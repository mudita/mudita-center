/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { storybookHelper } from "app-theme/utils"
import { IconType } from "app-theme/models"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  argTypes: {
    type: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the type of the button.")
      .apply(),
    size: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the size of the button.")
      .apply(),
    icon: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the icon for the button.")
      .generateEnumSelector(IconType, "IconType")
      .apply(),
    to: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the link for the button.")
      .apply(),
    onClick: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the click handler for the button.")
      .apply(),
    disabled: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines whether the button is disabled or not.")
      .apply(),
    className: storybookHelper.disableControl().apply(),
    children: storybookHelper.disableControl().apply(),
  },
  args: {
    type: "primary",
    size: "auto-max",
    icon: undefined,
    to: undefined,
    onClick: undefined,
    children: "Primary button",
  },
}
