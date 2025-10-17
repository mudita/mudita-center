/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import type { Meta, StoryObj } from "@storybook/react"
import { storybookHelper } from "app-theme/utils"
import { Radio } from "./radio"

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

const meta: Meta<typeof Radio> = {
  title: "UI/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `<Radio>` component is a basic form element that allows users to select exactly one option from a group.\n\n" +
          "It supports all standard HTML input attributes available for inputs of `radio` type.\n\n" +
          "Additionally, it provides `label` and `subLabel` properties for text display.",
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

type Story = StoryObj<typeof Radio>

export const Default: Story = {
  name: "Default",
  argTypes: {
    label: storybookHelper
      .assignCategory("Functional")
      .addDescription("Main label displayed next to the radio input.")
      .apply(),
    subLabel: storybookHelper
      .assignCategory("Functional")
      .addDescription("Optional secondary description below the label.")
      .apply(),
    name: storybookHelper
      .assignCategory("HTML")
      .addDescription("Defines the name of the radio group.")
      .apply(),
    value: storybookHelper
      .assignCategory("HTML")
      .addDescription("Specifies the value of the radio option.")
      .apply(),
    disabled: storybookHelper
      .assignCategory("HTML")
      .addDescription("Disables interaction with the radio button.")
      .apply(),
    checked: storybookHelper
      .assignCategory("Controlled")
      .addDescription("Marks the radio as selected in controlled mode.")
      .apply(),
    defaultChecked: storybookHelper
      .assignCategory("Uncontrolled")
      .addDescription("Sets the initial selected state.")
      .apply(),
    ref: storybookHelper.disableControl().apply(),
    indeterminate: storybookHelper.disableControl().apply(),
  },
  args: {
    name: "example",
    value: "optionA",
    label: "Option A",
  },
  parameters: {
    docs: {
      source: {
        code: '<Radio name="example" value="optionA" label="Option A" />',
      },
    },
  },
  render: (args) => <Radio {...args} />,
}

export const WithSubLabel: Story = {
  name: "With sublabel",
  argTypes: Default.argTypes,
  args: {
    name: "example",
    value: "optionB",
    label: "Option B",
    subLabel: "Additional description for this option.",
  },
  parameters: {
    docs: {
      source: {
        code: '<Radio name="example" value="optionB" label="Option B" subLabel="Additional description for this option." />',
      },
    },
  },
}

export const Disabled: Story = {
  name: "Disabled",
  argTypes: Default.argTypes,
  render: () => (
    <Row>
      <Radio name="disabled" value="x" label="Disabled (unchecked)" disabled />
      <Radio
        name="disabled2"
        value="y"
        label="Disabled (checked)"
        disabled
        defaultChecked
      />
    </Row>
  ),
  parameters: {
    docs: {
      source: {
        code:
          '<Radio name="disabled" value="x" label="Disabled (unchecked)" disabled />\n' +
          '<Radio name="disabled2" value="y" label="Disabled (checked)" disabled defaultChecked />',
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
        code: '<Radio name="nolabel" value="plain" />',
      },
    },
  },
  render: (args) => <Radio {...args} />,
}

export const LongLabelWrapping: Story = {
  name: "Long label wrapping",
  argTypes: Default.argTypes,
  args: {
    name: "long",
    value: "wrap",
    label:
      "Very long label that should wrap to the next line in narrow layouts to verify text wrapping behavior in the component.",
    subLabel: "Optional helper text that also may wrap.",
  },
  parameters: {
    docs: {
      source: {
        code: '<Radio name="long" value="wrap" label="Very long label that should wrap..." subLabel="Optional helper text..." />',
      },
    },
  },
}
