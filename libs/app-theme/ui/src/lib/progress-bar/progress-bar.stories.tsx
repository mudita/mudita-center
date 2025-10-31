/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { ProgressBar } from "./progress-bar"
import { storybookHelper } from "app-theme/utils"

const meta: Meta<typeof ProgressBar> = {
  title: "UI/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `<ProgressBar />` visualizes the progression of a task, providing users with feedback on the current status of ongoing operations." +
          " It supports both determinate and indeterminate states, allowing for flexibility in representing progress based on the nature of the task at hand.",
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  argTypes: {
    value: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Specifies the current progress value of the task being represented by the progress bar."
      )
      .apply({
        control: {
          type: "number",
          min: 0,
          step: 1,
        },
      }),
    message: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the message displayed above the progress bar to provide context about the ongoing task."
      )
      .apply({
        control: {
          type: "text",
        },
      }),
    maxValue: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Specifies the maximum value that the progress bar can represent, indicating the completion point of the task."
      )
      .apply({
        control: {
          type: "number",
          min: 1,
          step: 1,
        },
      }),
    valueUnit: storybookHelper
      .assignCategory("Styles")
      .addDescription(
        "Defines the visual unit displayed alongside the progress value, such as a percentage or specific measurement."
      )
      .apply({
        control: {
          type: "text",
        },
      }),
    indeterminate: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Indicates whether the progress bar should be displayed in an indeterminate state, typically used when the duration of the task is unknown."
      )
      .apply({
        control: {
          type: "boolean",
        },
      }),
  },
  args: {
    value: 45,
    message: "Sending file: ABC.xyz",
    maxValue: 100,
    indeterminate: false,
    valueUnit: "%",
  },
  render: (props) => {
    return <ProgressBar {...props} />
  },
}

export const Indeterminate: Story = {
  argTypes: Default.argTypes,
  args: {
    ...Default.args,
    indeterminate: true,
  },
  render: (props) => {
    return <ProgressBar {...props} />
  },
}
