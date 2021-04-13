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
import { Text, TextDecorator, TextVariant } from "../.."

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
    label: {
      description: "Basic label with some predefined styles applied.",
      control: "text",
    },
    children: {
      description:
        "A custom text or component rendered if no `label` is applied. No styling is applied.",
      table: {
        type: {
          summary:
            "String | Number | Boolean | ReactNode | ReactNodeArray | ReactElement",
        },
      },
    },
    size: {
      description:
        "Predefined size of checkbox. It also applies additional styling to the label if `simpleLabel` is `true`.\n",
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

export const CheckedBasicCheckbox = storyCreator({ defaultChecked: true })

export const IndeterminateBigCheckbox = storyCreator({
  indeterminate: true,
  size: CheckboxSize.Big,
})

export const CheckboxWithLabel = storyCreator({
  label: "Click me to change my state",
})

export const BigCheckboxWithLabel = storyCreator({
  label: "Click me to change my state",
  size: CheckboxSize.Big,
})

export const CheckboxWithCustomLabel = storyCreator({
  children: (
    <Text variant={TextVariant.SmallLight} decorators={[TextDecorator.Error]}>
      Click me to change my state
    </Text>
  ),
})

export const DisabledCheckbox = storyCreator({
  label: "You can't change me",
  defaultChecked: true,
  disabled: true,
})

export const DisabledCheckboxWithCustomLabel = storyCreator({
  children: (
    <Text variant={TextVariant.SmallLight} decorators={[TextDecorator.Error]}>
      You can't change me
    </Text>
  ),
  defaultChecked: true,
  disabled: true,
})
