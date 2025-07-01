/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "./checkbox"
import { storybookHelper } from "app-theme/utils"
import { CheckboxSize } from "app-theme/models"

const Decorator = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  justify-items: center;
  align-items: center;
  width: 25rem;
  gap: 4rem;
`

const InnerDecorator = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `<Checkbox>` component is a basic form element that allows users to select things.\n\n" +
          "It supports all standard HTML input attributes available for inputs of `checkbox` type.\n\n" +
          "Additionaly, it covers the indeterminate state by `indeterminate` property " +
          "and allows to pass a text label using `children` property. " +
          "Styles can be customized by defining `size` property.\n\n",
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

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  name: "Default",
  argTypes: {
    size: storybookHelper
      .assignCategory("Styles")
      .addDescription("Defines the size of the checkbox. ")
      .generateEnumSelector(CheckboxSize, "CheckboxSize")
      .apply(),
    indeterminate: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines whether the checkbox is in indeterminate state. " +
          "This state is used to indicate that some, but not all, of the items in a group are selected."
      )
      .apply(),
    children: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Label that will be displayed next to the checkbox. " +
          "It can be used to describe the purpose of the checkbox. Raw text will be rendered as `<Typography.P1>` component."
      )
      .apply(),
    ref: storybookHelper.disableControl().apply(),
  },
  args: {
    size: CheckboxSize.Large,
    indeterminate: false,
  },
  parameters: {
    docs: {
      source: {
        code: "<Checkbox />",
      },
    },
  },
  render: (args) => {
    return <Checkbox {...args} />
  },
}

export const Indeterminate: Story = {
  name: "Indeterminate",
  argTypes: Default.argTypes,
  args: {
    indeterminate: true,
  },
  parameters: {
    docs: {
      source: {
        code: "<Checkbox indeterminate />",
      },
    },
  },
}

export const WithText: Story = {
  name: "With text",
  argTypes: Default.argTypes,
  args: {
    children: "Check me",
  },
  parameters: {
    docs: {
      source: {
        code: "<Checkbox>Check me</Checkbox>",
      },
    },
  },
}

export const AllSizesAndVariants: Story = {
  name: "All sizes and variants",
  argTypes: Default.argTypes,
  render: (args) => {
    return (
      <>
        <InnerDecorator>
          <Checkbox checked={false} size={CheckboxSize.Small} />
          <Checkbox size={CheckboxSize.Small} checked />
          <Checkbox {...args} size={CheckboxSize.Small} indeterminate />
        </InnerDecorator>
        <InnerDecorator>
          <Checkbox checked={false} />
          <Checkbox checked />
          <Checkbox indeterminate />
        </InnerDecorator>
      </>
    )
  },
  parameters: {
    docs: {
      source: {
        code: "<Checkbox size={CheckboxSize.Small} />\n" + "<Checkbox />\n",
      },
    },
  },
}
