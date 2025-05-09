/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import styled from "styled-components"
import { TextInput } from "./text-input"
import { IconSize, IconType, TextInputVariant } from "app-theme/models"
import { IconButton } from "../../icon-button/icon-button"
import { Icon } from "../../icon/icon"
import { storybookHelper } from "app-theme/utils"

const Decorator = styled.div`
  align-self: center;
  justify-self: center;
  width: 25rem;
`

const InnerDecorator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`

const meta: Meta<typeof TextInput> = {
  title: "UI/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `<TextInput>` component is a basic form element that allows users to input text.\n\n" +
          "It supports all standard HTML input attributes. Only the `type` property is limited to: " +
          "`date`, `datetime-local`, `email`, `month`, `number`, `password`, `search`, `tel`, `text`, `time`, `url` and `week`.\n\n" +
          "Additionaly, its style can be customized by defining `variant`, `leftSlot` and `rightSlot` properties. " +
          "Also, basic error state is supported by the `TextInputVariant.Filled` variant, allowing to use the `error` property.\n\n" +
          "For more advanced use cases, consider using one of the dedicated components... [TBC]",
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

type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  name: "Default variant",
  argTypes: {
    variant: storybookHelper
      .assignCategory("Styles")
      .generateEnumSelector(TextInputVariant, "TextInputVariant")
      .addDescription(
        "Defines the variant of the text input.\n\n" +
          "The `TextInputVariant.Outlined` variant does not support error state.\n\n" +
          "For `TextInputVariant.Filled`, an additional `error` prop is available.\n"
      )
      .apply(),
    placeholder: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the placeholder text.")
      .apply(),
    error: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the error message and applies proper styles.")
      .apply({
        control: {
          type: "text",
        },
        if: {
          arg: "variant",
          eq: TextInputVariant.Filled,
        },
      }),
    leftSlot: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the left slot of the text input. Its main purpose is to display visual elements like icons."
      )
      .setType("ReactNode")
      .apply({
        control: false,
      }),
    rightSlot: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the right slot of the text input. Its main purpose is to display interactive elements like buttons."
      )
      .setType("ReactNode")
      .apply({
        control: false,
      }),
    type: storybookHelper
      .addDescription(
        "Defines the type of the text input. The default value is `text`."
      )
      .apply({
        options: [
          "text",
          "password",
          "email",
          "tel",
          "url",
          "date",
          "datetime-local",
          "month",
          "number",
          "search",
          "time",
          "week",
        ],
        control: {
          type: "select",
        },
      }),
  },
  args: {
    variant: TextInputVariant.Outlined,
    placeholder: "Placeholder",
    defaultValue: "",
  },
  parameters: {
    docs: {
      source: {
        code: '<TextInput placeholder="Placeholder" />',
      },
    },
  },
}

export const Filled: Story = {
  name: "Filled variant",
  args: {
    variant: TextInputVariant.Filled,
    placeholder: "Placeholder",
  },
  parameters: {
    docs: {
      source: {
        code: '<TextInput placeholder="Placeholder" variant={TextInputVariant.Filled} />',
      },
    },
  },
}

export const FilledWithError: Story = {
  name: "Filled variant with error",
  argTypes: {
    leftSlot: storybookHelper.disableControl().apply(),
    rightSlot: storybookHelper.disableControl().apply(),
    variant: storybookHelper.disableControl().apply(),
  },
  args: {
    variant: TextInputVariant.Filled,
    placeholder: "Placeholder",
    error: "Error message",
    value: "Wrong value",
  },
  parameters: {
    docs: {
      source: {
        code:
          "<TextInput\n" +
          '  placeholder="Placeholder"\n' +
          "  variant={TextInputVariant.Filled}\n" +
          '  error="Error message"\n' +
          '  value={"Wrong value"}\n' +
          "/>",
      },
    },
  },
}

export const WithIconInLeftSlot: Story = {
  name: "With icon in left slot",
  argTypes: {
    leftSlot: storybookHelper.disableControl().apply(),
    rightSlot: storybookHelper.disableControl().apply(),
    variant: storybookHelper.disableControl().apply(),
  },
  args: {
    placeholder: "Placeholder",
  },
  parameters: {
    docs: {
      source: {
        code:
          "<TextInput\n" +
          "  leftSlot={<Icon type={IconType.Search} size={IconSize.Medium} />}\n" +
          "/>\n\n" +
          "<TextInput\n" +
          "  variant={TextInputVariant.Filled}\n" +
          "  leftSlot={<Icon type={IconType.Search} size={IconSize.Medium} />}\n" +
          "/>",
      },
    },
  },
  render: ({ leftSlot, rightSlot, ...args }) => {
    return (
      <InnerDecorator>
        <TextInput
          {...args}
          leftSlot={<Icon type={IconType.Search} size={IconSize.Medium} />}
        />
        <TextInput
          {...args}
          variant={TextInputVariant.Filled}
          leftSlot={<Icon type={IconType.Search} size={IconSize.Medium} />}
        />
      </InnerDecorator>
    )
  },
}

export const WithButtonInRightSlot: Story = {
  name: "With button in right slot",
  argTypes: {
    leftSlot: storybookHelper.disableControl().apply(),
    rightSlot: storybookHelper.disableControl().apply(),
    variant: storybookHelper.disableControl().apply(),
  },
  args: {
    placeholder: "Placeholder",
  },
  parameters: {
    docs: {
      source: {
        code:
          "<TextInput\n" +
          "  rightSlot={<IconButton icon={IconType.Close} />}\n" +
          "/>\n\n" +
          "<TextInput\n" +
          "  variant={TextInputVariant.Filled}\n" +
          "  rightSlot={<IconButton icon={IconType.Close} />}\n" +
          "/>",
      },
    },
  },
  render: ({ leftSlot, rightSlot, ...args }) => {
    return (
      <InnerDecorator>
        <TextInput {...args} rightSlot={<IconButton icon={IconType.Close} />} />
        <TextInput
          {...args}
          variant={TextInputVariant.Filled}
          rightSlot={<IconButton icon={IconType.Close} />}
        />
      </InnerDecorator>
    )
  },
}
