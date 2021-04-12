import React from "react"
import { paths } from "../../../.storybook/paths"
import { Icon } from "./icon.component"
import { ComponentProps } from "react"
import { Meta, Story } from "@storybook/react"
import { theme } from "../.."
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
import CheckboxChecked from "../../../assets/checkbox-checked.svg"
import CheckboxIndeterminate from "../../../assets/checkbox-indeterminate.svg"
import CheckboxDropdown from "../../../assets/checkbox-dropdown.svg"

const TemplateIcon = styled(Icon)`
  box-shadow: 0 0 0.1rem 0 #000;
`

const Template: Story<ComponentProps<typeof Icon>> = ({ ...props }) => {
  return <TemplateIcon {...props} />
}

type StoryCreatorProps = { name: string } & ComponentProps<typeof Icon>

const storyCreator = ({
  name,
  ...props
}: StoryCreatorProps): Story<StoryCreatorProps> => {
  const Story = Template.bind({})
  Story.args = {
    ...props,
  }

  Story.parameters = {
    docs: {
      source: {
        code: `<Icon>
  <${name} />
</Icon>`,
      },
    },
  }
  return Story
}

const description = `\`<Icon>\` component allows to easily use and customize all icons defined in our design system.
It always renders as \`<span>\` element so it can be freely used in many different scenarios.

It's just a wrapper that adds some additional styling to the \`svg\` component placed inside, so the implementation is as following:

\`\`\`TSX
import

<Icon>
  <CheckboxChecked />
</Icon>
\`\`\`

> **Note:** The border around icons is only for presentation purpose to show the real size of icon component.`

export default {
  title: `${paths.atoms}/Icon`,
  component: Icon,
  argTypes: {
    children: {
      control: "",
      description: "An SVG component",
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
    width: {
      control: {
        type: "number",
        min: 0,
        max: 10,
        step: 1,
      },
      description: "Custom width in `rem` unit.",
      defaultValue: 2,
      table: {
        type: {
          summary: "Number",
          detail: "Only positive numbers are allowed",
        },
      },
    },
    height: {
      description: "Custom height in `rem` unit.",
      defaultValue: 2,
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
} as Meta

export const Default = Template.bind({})
Default.args = {
  children: <CheckboxChecked />,
}
Default.parameters = {
  docs: {
    source: {
      code: " ",
    },
  },
}

export const CheckboxCheckedIcon = storyCreator({
  name: "CheckboxChecked",
  children: <CheckboxChecked />,
})
export const CheckboxIndeterminateIcon = storyCreator({
  name: "CheckboxIndeterminate",
  children: <CheckboxIndeterminate />,
})
export const CheckboxDropdownIcon = storyCreator({
  name: "CheckboxDropdown",
  children: <CheckboxDropdown />,
})
