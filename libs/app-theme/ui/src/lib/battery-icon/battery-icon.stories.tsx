/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { storybookHelper } from "app-theme/utils"
import { IconSize } from "app-theme/models"
import styled from "styled-components"
import { BatteryIcon } from "./battery-icon"

const Decorator = styled.div`
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  width: 10rem;

  h2 {
    margin: 0 0 -1.2rem;
  }
`

const meta: Meta<typeof BatteryIcon> = {
  title: "UI/BatteryIcon",
  component: BatteryIcon,
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
          "The `<BatteryIcon>` component is used to visually represent the battery level of a device. " +
          "It displays different battery icons based on the provided battery level percentage, ranging from empty to full.",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof BatteryIcon>

export const Default: Story = {
  argTypes: {
    batteryPercentage: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the battery level to be displayed. Accepts values from 0 to 100."
      )
      .setType("number")
      .apply({ control: { type: "number", min: 0, max: 100, step: 1 } }),
    size: storybookHelper
      .assignCategory("Styles")
      .addDescription(
        "Defines the size of the icon. It accepts the same values as the [`<Icon>` component](/?path=/docs/ui-icon--docs)."
      )
      .generateEnumSelector(IconSize, "IconSize")
      .apply(),
  },
  args: {
    batteryPercentage: 50,
    size: IconSize.Medium,
  },
  parameters: {
    docs: {
      source: {
        code: `<BatteryIcon level={50} />`,
      },
    },
  },
}
