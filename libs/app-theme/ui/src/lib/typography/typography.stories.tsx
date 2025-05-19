/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import styled from "styled-components"
import { Typography } from "./typography"

const Decorator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const AllIconsDecorator = styled.div``

const meta: Meta<typeof Typography> = {
  title: "UI/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `<Typography>` component is a wrapper for icons designed by Mudita.",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Typography>

export const Default: Story = {
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
  render: () => {
    return (
      <>
        <Typography.H1>Typography.H1</Typography.H1>
        <Typography.H2>Typography.H2</Typography.H2>
        <Typography.H3>Typography.H3</Typography.H3>
        <Typography.H4>Typography.H4</Typography.H4>
        <Typography.H5>Typography.H5</Typography.H5>
        <Typography.P1>Typography.P1</Typography.P1>
        <Typography.P2>Typography.P2</Typography.P2>
        <Typography.P3>Typography.P3</Typography.P3>
        <Typography.P4>Typography.P4</Typography.P4>
        <Typography.P5>Typography.P5</Typography.P5>
      </>
    )
  },
}
