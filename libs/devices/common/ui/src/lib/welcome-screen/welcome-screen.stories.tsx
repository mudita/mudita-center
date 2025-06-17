/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react-vite"
import { storybookHelper } from "app-theme/utils"
import { WelcomeScreen } from "./welcome-screen"
import styled from "styled-components"

const Decorator = styled.div`
  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
`

const meta: Meta<typeof WelcomeScreen> = {
  title: "App/Devices/Welcome screen",
  component: WelcomeScreen,
  decorators: [
    (Story) => (
      <Decorator className={"no-padding"}>
        <Story />
      </Decorator>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof WelcomeScreen>

export const Default: Story = {
  argTypes: {
    onClose: storybookHelper
      .addDescription(
        "Function to be called when <i>Not now</i> button is clicked."
      )
      .apply({
        control: {
          disable: true,
        },
      }),
    onTroubleshoot: storybookHelper
      .addDescription(
        "Function to be called when <i>My device doesn’t show...</i> button is clicked."
      )
      .apply({
        control: {
          disable: true,
        },
      }),
  },
}
