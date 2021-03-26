import { paths } from "Storybook/paths"
import { Text } from "Components/text/text.component"
import { storyCreator } from "Components/storybook/typography/typography.helpers"
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks"
import React from "react"
import { theme } from "Theme/theme-provider"
import { TextDecorator, TextVariant } from "Components/text/text.enum"

const description = `
\`<Text>\` component has also some additional props available, that makes it more flexible while still standing with Mudita style:
`

export default {
  title: `${paths.typography}/Advanced`,
  component: Text,
  argTypes: {
    children: {
      control: "text",
      description: "A content between `<Text>...</Text>` tags.",
      defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      table: {
        type: {
          summary:
            "String | Number | Boolean | ReactNode | ReactNodeArray | ReactElement",
        },
      },
    },
    variant: {
      control: {
        type: "select",
        options: Object.values(TextVariant),
      },
      description:
        "One of predefined text styles. It also specifies which HTML tag is used to render the content.",
      table: {
        type: {
          detail: `TextVariant.Basic, TextVariant.HeadingPrimary, TextVariant.SmallLight, ...`,
        },
      },
    },
    tag: {
      description:
        "Any valid HTML element tag. It will be used to render the `<Text>` component. \n\n **Note:** Values available in the selector are chosen only for demo purposes. Not all available tags are presented here. Also bear in mind using some tags may not be correct and cause issues.",
      control: {
        type: "select",
        options: [
          "a",
          "b",
          "blockquote",
          "button",
          "del",
          "div",
          "em",
          "figcaption",
          "h1",
          "h2",
          "label",
          "li",
          "ol",
          "p",
          "pre",
          "q",
          "span",
          "strong",
          "sub",
          "summary",
          "sup",
          "td",
          "textarea",
          "time",
          "u",
          "ul",
        ],
      },
      table: {
        type: {
          detail: `"h1", "h2", "p", "sup", "em", "textarea", "span", ...`,
        },
      },
    },
    color: {
      control: {
        type: "select",
        options: Object.keys(theme.color),
      },
      description:
        "One of predefined colors. It can override `color` set by `variant`.",
      table: {
        type: {
          summary: "Color",
          detail: `"${Object.keys(theme.color).slice(0, 5).join('", "')}", ...`,
        },
      },
    },
    size: {
      description:
        "One of predefined font sizes. It can override `font-size` set by `variant`.",
      table: {
        type: {
          summary: "FontSize",
          detail: `"${Object.keys(theme.fontSize).join('", "')}"`,
        },
      },
    },
    weight: {
      description:
        "One of predefined font weight. It can override `font-weight` set by `variant`.",
      table: {
        type: {
          summary: "FontWeight",
          detail: `"${Object.keys(theme.fontWeight).join('", "')}"`,
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
      table: {
        type: {
          detail: `[TextDecorator.Accent, TextDecorator.UpperCase, ...]`,
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
}

export const Default = storyCreator({})
Default.parameters = {
  docs: {
    source: {
      code: " ",
    },
  },
}

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
