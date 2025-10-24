/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import type { Meta, StoryObj } from "@storybook/react"
import { storybookHelper } from "app-theme/utils"
import { RadioInput } from "./radio-input"

const Decorator = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  justify-items: center;
  align-items: flex-start;
  width: 32rem;
  gap: 2.4rem;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`

const meta: Meta<typeof RadioInput> = {
  title: "UI/RadioInput",
  component: RadioInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `<RadioInput>` component is a basic form element that allows users to select exactly one option from a group.\n" +
          "It supports all standard HTML input attributes available for inputs of `radio` type.\n\n" +
          "Additionally, it accepts a `children` property for label display. " +
          "It can be either a simple string or any ReactNode element for more complex labels.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof RadioInput>

export const Default: Story = {
  name: "Default",
  argTypes: {
    name: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the name of the radio group.")
      .apply(),
    value: storybookHelper
      .assignCategory("Functional")
      .addDescription("Specifies the value associated with the radio option.")
      .apply(),
    children: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Specifies the content displayed next to the radio button. " +
          "Can be a `string` or any `ReactNode` element.\n\n" +
          "**When using a non-string value, disabled styles may need to be applied manually.**"
      )
      .apply(),
    disabled: storybookHelper
      .assignCategory("Functional")
      .addDescription("Disables interaction with the radio button.")
      .apply({
        control: "boolean",
      }),
    checked: storybookHelper
      .assignCategory("Functional")
      .addDescription("Marks the radio as selected in controlled mode.")
      .apply({
        control: "boolean",
      }),
    defaultChecked: storybookHelper
      .assignCategory("Functional")
      .addDescription("Sets the initial selected state.")
      .apply({
        control: "boolean",
      }),
    ref: storybookHelper.disableControl().apply(),
  },
  args: {
    name: "example",
    value: "optionA",
    children: "Option A",
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        code: '<RadioInput name="example" value="optionA">Option A</RadioInput>',
      },
    },
  },
  render: ({ children, ...args }) => (
    <RadioInput {...args}>{children}</RadioInput>
  ),
}

export const Disabled: Story = {
  name: "Disabled",
  argTypes: Default.argTypes,
  render: () => (
    <Row>
      <RadioInput name="disabled" value="x" disabled>
        Disabled (unchecked)
      </RadioInput>
      <RadioInput name="disabled2" value="y" disabled defaultChecked>
        Disabled (checked)
      </RadioInput>
    </Row>
  ),
  parameters: {
    docs: {
      source: {
        code:
          '<RadioInput name="disabled" value="x" disabled>Disabled (unchecked)</RadioInput>\n' +
          '<RadioInput name="disabled2" value="y" disabled defaultChecked>Disabled (checked)</RadioInput>',
      },
    },
  },
}

export const WithoutLabel: Story = {
  name: "Without label",
  argTypes: Default.argTypes,
  args: {
    name: "nolabel",
    value: "plain",
  },
  parameters: {
    docs: {
      source: {
        code: '<RadioInput name="nolabel" value="plain" />',
      },
    },
  },
  render: (args) => <RadioInput {...args} />,
}

export const LongLabelWrapping: Story = {
  name: "Long label wrapping",
  argTypes: Default.argTypes,
  args: {
    name: "long",
    value: "wrap",
    children:
      "Very long label that should wrap to the next line in narrow layouts to verify text wrapping behavior in the component.",
  },
  parameters: {
    docs: {
      source: {
        code: '<RadioInput name="long" value="wrap">Very long label that should wrap...</RadioInput>',
      },
    },
  },
}
