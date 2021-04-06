import React from "react"
import { paths } from "../../../../.storybook/paths"
import { Text, TextVariant, TextDecorator } from "../../.."
import { storyCreator } from "./typography.helpers"
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks"
import { Meta } from "@storybook/react"
import basicTypographyStory from "./basic-typography.stories"

const description = `
\`<Text>\` component has also some additional props available making it more flexible while still being coherent Mudita style:
`

export default {
  title: `${paths.typography}/Advanced`,
  component: Text,
  argTypes: {
    ...basicTypographyStory.argTypes,
    tag: {
      description:
        "Any valid HTML element tag. It will be used to render the `<Text>` component. \n\n **Warning:** Using some tags may not be correct and cause rendering or accessibility issues.",
      table: {
        type: {
          summary: "keyof HTMLElementTagNameMap",
        },
      },
    },
    color: {
      description:
        "One of predefined colors. It can override `color` set by `variant`.",
      table: {
        type: {
          summary: "Color",
        },
      },
    },
    size: {
      description:
        "One of predefined font sizes. It can override `font-size` set by `variant`. Theme's dedicated function is `getFontSize`.",
      table: {
        type: {
          summary: "FontSize",
        },
      },
    },
    weight: {
      control: "select",
      description:
        "One of predefined font weight. It can override `font-weight` set by `variant`. Theme's dedicated function is `getFontWeight`.",
      table: {
        type: {
          summary: "FontWeight",
        },
      },
    },
    decorators: {
      control: {
        type: "multi-select",
        options: Object.values(TextDecorator),
      },
      description:
        "Decorator is a set of CSS rules that extends or overrides styles applied by `variant`, `color`, `size` and `weight` props. It also means it can not change the rendered tag defined in `variant` or `tag` prop.",
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
          <Title>Style</Title>
          <Subtitle>Advanced typography</Subtitle>
          <Description markdown={description} />
          <ArgsTable story={PRIMARY_STORY} />
          <Primary />
          <Stories title="Examples" />
        </>
      ),
    },
  },
} as Meta

export const Default = storyCreator({})

export const CustomTag = storyCreator({
  tag: "pre",
})

export const CustomColor = storyCreator({
  color: "red",
})

export const CustomSize = storyCreator({
  size: "24",
})

export const CustomWeight = storyCreator({
  weight: "light",
})

export const WithDecorator = storyCreator({
  variant: TextVariant.HeadingPrimary,
  decorators: [TextDecorator.Accent],
})
