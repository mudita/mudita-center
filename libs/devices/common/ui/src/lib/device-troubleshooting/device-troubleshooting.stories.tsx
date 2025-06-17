/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react-vite"
import { DeviceTroubleshooting } from "./device-troubleshooting"
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

const meta: Meta<typeof DeviceTroubleshooting> = {
  title: "App/Devices/Troubleshooting Screen",
  component: DeviceTroubleshooting,
}

export default meta

type Story = StoryObj<typeof DeviceTroubleshooting>

export const Default: Story = {
  decorators: [
    (Story) => (
      <Decorator className={"no-padding"}>
        <Story />
      </Decorator>
    ),
  ],
}
