import { Meta, Story } from "@storybook/react"
import { paths } from "../../../.storybook/paths"
import { Radio } from "./radio.component"
import React, { ComponentProps } from "react"
import {
  ArgsTable,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks"
import { RadioSize } from "./radio.enum"
import { Text, TextDecorator, TextVariant } from "../.."

const Template: Story<ComponentProps<typeof Radio>> = ({ ...props }) => {
  return <Radio {...props} />
}

const storyCreator = ({
  ...props
}: ComponentProps<typeof Radio> = {}): Story => {
  const Story = Template.bind({})
  Story.args = {
    ...props,
  }

  Story.parameters = {
    docs: {},
  }
  return Story
}

export default {
  title: `${paths.atoms}/Radio`,
  component: Radio,
  argTypes: {
    label: {
      description: "Basic label with some predefined styles applied.",
      control: "text",
    },
    children: {
      description:
        "A custom text or component rendered if `label` is not provided. No styling is applied.",
      table: {
        type: {
          summary:
            "String | Number | Boolean | ReactNode | ReactNodeArray | ReactElement",
        },
      },
    },
    size: {
      description:
        "Predefined size of radio button. It also applies additional styling to the `label`.",
      table: {
        type: {
          summary: "RadioSize",
        },
      },
      control: "select",
    },
    checked: {
      control: "boolean",
      description: "Indicates whether radio is checked or not.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    disabled: {
      control: "boolean",
      description:
        "Indicates whether radio is disabled or not. Disabled radio state cannot be changed.",
    },
    ref: {
      description:
        "A reference object that can be passed to the native radio input.\n\nIt's useful in customizing its behavior programmatically or integrate with external library.",
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
          <Title>Radio</Title>
          <Subtitle>Atomic component</Subtitle>
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
  label: "Lorem ipsum dolor sit amet",
}

export const SimpleSmallRadio = storyCreator({ size: RadioSize.Small })

export const CheckedBasicRadio = storyCreator({ defaultChecked: true })

export const RadioWithLabel = storyCreator({
  label: "Click me to change my state",
})

export const BigRadioWithLabel = storyCreator({
  label: "Click me to change my state",
  size: RadioSize.Big,
})

export const RadioWithCustomLabel = storyCreator({
  children: (
    <Text variant={TextVariant.SmallLight} decorators={[TextDecorator.Error]}>
      Click me to change my state
    </Text>
  ),
})

export const DisabledRadio = storyCreator({
  label: "You can't check me",
  disabled: true,
})

export const DisabledRadioWithCustomLabel = storyCreator({
  children: (
    <Text variant={TextVariant.SmallLight} decorators={[TextDecorator.Error]}>
      You can&apos;t check me
    </Text>
  ),
  disabled: true,
})
