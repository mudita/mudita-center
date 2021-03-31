import { paths } from "Storybook/paths"
import { Icon } from "Components/icon/icon.component"
import React, { ComponentProps } from "react"
import { Story } from "@storybook/react"
import { IconSize, IconType } from "Components/icon/icon.enum"
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
import styled from "styled-components"

const TemplateIcon = styled(Icon)`
  box-shadow: 0 0 0.1rem 0 #000;
`

const Template: Story<ComponentProps<typeof Icon>> = ({
  type = IconType.CheckboxChecked,
  ...props
}) => {
  return <TemplateIcon {...props} type={type} />
}

const storyCreator = ({
  ...props
}: ComponentProps<typeof Icon>): Story<ComponentProps<typeof Icon>> => {
  const Story = Template.bind({})
  Story.args = {
    ...props,
    size: IconSize.Basic,
  }

  Story.parameters = {
    docs: {
      source: {
        code: `<Icon type={IconType.${props.type}} />`,
      },
    },
  }
  return Story
}

const description = `\`<Icon>\` component allows to easily use and customize all icons defined in our design system.

It always renders as \`<span>\` element so it can be freely used in many different scenarios.

> **Note:** The border around icons is only for presentation purpose to show the real size of icon component.`

export default {
  title: `${paths.atoms}/Icon`,
  component: Icon,
  argTypes: {
    type: {
      control: {
        type: "select",
        options: Object.values(IconType),
      },
      description: "The selected icon.",
      defaultValue: null,
      table: {
        type: {
          summary: "IconType",
          detail: `IconType.CheckboxChecked, IconType.CheckboxDropdown, ...`,
        },
      },
    },
    size: {
      control: {
        type: "select",
        options: [...Object.values(IconSize), undefined],
      },
      defaultValue: null,
      description:
        "One of predefined size. If not provided, the original SVG size will be applied (from `width` and `height` but converted to `rem`).",
      table: {
        type: {
          summary: "IconSize",
          detail: `IconSize.Basic, IconSize.Small, IconSize.Big`,
        },
      },
    },
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
    stretch: {
      description:
        "Decides whether icon should be stretched (preserving aspect ratio) to the container or preserve original ratio between icon size and `viewBox`.",
      table: {
        type: {
          detail: "Default is `false`",
        },
      },
    },
    width: {
      control: {
        type: "number",
        min: 0,
        max: 10,
        step: 1,
      },
      description:
        "Custom width in `rem` unit. It's applied with the following rules:\n\n- if it's specified along with `size`, it overrides its `width`\n- if no `size` and `height` are specified, it's treated as `height` too (square icon)\n- `0` is treated as undefined",
      table: {
        type: {
          summary: "Number",
          detail: "Only positive numbers are allowed",
        },
      },
    },
    height: {
      description:
        "Custom height in `rem` unit. It's applied with the following rules:\n\n- if it's specified along with `size`, it overrides its `height`\n- if no `size` and `width` are specified, it's treated as `width` too (square icon)\n- `0` is treated as undefined",
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
          <Stories title={"Available icons"} />
        </>
      ),
    },
  },
}

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    source: {
      code: " ",
    },
  },
}

export const CheckboxChecked = storyCreator({ type: IconType.CheckboxChecked })
export const CheckboxIndeterminate = storyCreator({
  type: IconType.CheckboxIndeterminate,
})
export const CheckboxDropdown = storyCreator({
  type: IconType.CheckboxDropdown,
})
