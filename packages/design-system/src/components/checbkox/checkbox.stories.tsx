import { Meta, Story } from "@storybook/react"
import { paths } from "../../../.storybook/paths"
import { Checkbox } from "./checkbox.component"
import React, { ComponentProps } from "react"
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks"
import { CheckboxSize } from "./checkbox.enum"
import { Text, TextVariant } from "../.."

const Template: Story<ComponentProps<typeof Checkbox>> = ({ ...props }) => {
  return <Checkbox {...props} />
}

const storyCreator = ({
  ...props
}: ComponentProps<typeof Checkbox> = {}): Story => {
  const Story = Template.bind({})
  Story.args = {
    ...props,
  }

  Story.parameters = {
    docs: {},
  }
  return Story
}

const description = ""

export default {
  title: `${paths.atoms}/Checkbox`,
  component: Checkbox,
  argTypes: {
    children: {
      description: `If children is of \`String\` or \`Number\` type, it's being wrapped in \`<Text>\` tags.
This also applies additional styling to \`font-size\` and \`margin-left\` props, depending on checkbox's \`size\`.

Any other children type is rendered as is. No wrappers are added, so the label can be fully customized.`,
      table: {
        type: {
          summary:
            "String | Number | Boolean | ReactNode | ReactNodeArray | ReactElement",
        },
      },
    },
    size: {
      description:
        "Predefined size of checkbox. It also applies additional styling to the label if children is of type `Number` or `String`.\n",
      table: {
        type: {
          summary: "CheckboxSize | undefined",
        },
      },
      control: "select",
    },
    checked: {
      control: "boolean",
      description: "Indicates whether checkbox is checked or not.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    indeterminate: {
      control: "boolean",
      description:
        "Indicates whether checkbox is in an indeterminate state or not.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    ref: {
      description:
        "A reference object that can be passed to the native checkbox input.\n\n It's useful to customize behavior programmatically or integrate with external library.",
      table: {
        type: {
          summary: "ForwardedRef<HTMLInputElement>",
        },
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <>
          <Title>Checkbox</Title>
          <Subtitle>Atomic component</Subtitle>
          <Description markdown={description} />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories title="" />
        </>
      ),
    },
  },
} as Meta

export const Default = Template.bind({})
Default.args = {
  children: "Lorem ipsum dolor sit amet",
}

export const SimpleSmallCheckbox = storyCreator({ size: CheckboxSize.Small })

export const CheckedBasicCheckbox = storyCreator({ checked: true })

export const IndeterminateBigCheckbox = storyCreator({
  indeterminate: true,
  size: CheckboxSize.Big,
})

export const CheckboxWithDefaultStyledLabel = storyCreator({
  children: "Click me to change my state",
})

export const BigCheckboxWithDefaultStyledLabel = storyCreator({
  children: "Click me to change my state",
  size: CheckboxSize.Big,
})

export const CheckboxWithCustomLabel = storyCreator({
  children: <Text variant={TextVariant.SmallLightGrey}>Custom label</Text>,
})
