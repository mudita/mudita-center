import { paths } from "Storybook/paths"
import { Icon } from "Components/icon/icon.component"
import React, { ComponentProps } from "react"
import { Story } from "@storybook/react"
import { theme } from "Theme/theme-provider"
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks"
import { IconType } from "Icons"

const Template: Story<ComponentProps<typeof Icon>> = ({ ...props }) => {
  return <Icon {...props} />
}

const storyCreator = ({
  ...props
}: ComponentProps<typeof Icon>): Story<ComponentProps<typeof Icon>> => {
  const Story = Template.bind({})
  Story.args = {
    ...props,
    style: {
      boxShadow: "0 0 .1rem 0 rgba(0,0,0,.5)",
    },
  }

  const [enumName] =
    Object.entries(IconType).find(([, value]) => value === props.children) || []

  const sizeProp = props.size ? ` size={${props.size}}` : ""

  Story.parameters = {
    docs: {
      source: {
        code: `<Icon${sizeProp}>{IconType.${enumName}}</Icon>`,
      },
    },
  }
  return Story
}

const description = `\`<Icon>\` component is a wrapper that allows rendering our custom \`"Mudita Icons"\` font. It always renders as \`<span>\` element so it can be freely used in many different scenarios.

Because icons are de facto ligatures, they can be easily used in the following way:

\`\`\`TSX
<Icon>checkbox-checked</Icon>
\`\`\`

However, for easier development, there is an \`IconType\` enum that can be used instead:

\`\`\`TSX
<Icon>{IconType.CheckboxChecked}</Icon>
\`\`\`

> **Note:** The grey border around icons is only for demo purposes to show the size of icon container.
`

export default {
  title: `${paths.atoms}/Icon`,
  component: Icon,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: Object.keys(theme.color),
      },
      description:
        "One of predefined colors. If not specified, it's inherited from its parent.",
      table: {
        type: {
          summary: "Color",
          detail: `"${Object.keys(theme.color).slice(0, 5).join('", "')}", ...`,
        },
      },
    },
    size: {
      control: {
        type: "number",
        min: 0.5,
        max: 10,
        step: 0.1,
      },
      defaultValue: 2,
      description: "Font size in `rem` unit. Default is `2rem`.",
      table: {
        type: {
          summary: "Number",
          detail: "Only positive numbers are allowed",
        },
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    ref: {
      table: {
        disable: true,
      },
    },
    theme: {
      table: {
        disable: true,
      },
    },
    as: {
      table: {
        disable: true,
      },
    },
    forwardedAs: {
      table: {
        disable: true,
      },
    },
    style: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Icon</Title>
          <Subtitle>Atomic component</Subtitle>
          <Description markdown={description} />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories includePrimary title={"Available icons"} />
        </>
      ),
    },
  },
}

export const CheckboxChecked = storyCreator({
  children: IconType.CheckboxChecked,
})

export const CheckboxIndeterminate = storyCreator({
  children: IconType.CheckboxIndeterminate,
})

export const CheckboxDropdown = storyCreator({
  children: IconType.CheckboxDropdown,
})
