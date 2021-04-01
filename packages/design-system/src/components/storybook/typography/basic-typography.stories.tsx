import React from "react"
import { paths } from "Storybook/paths"
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks"
import { Text } from "Components/text/text.component"
import { storyCreator } from "Components/storybook/typography/typography.helpers"
import { TextVariant } from "Components/text/text.enum"

const description = `
There is a \`<Text>\` component that allows to style texts in different ways.

The basic usage is very simple. Just wrap the \`Text\` tags around given content and put the \`variant\` property which is a \`TextVariant\` enum, for example:

\`\`\`TSX
<Text variant={TextVariant.PrimaryHeading}>
  Some text
</Text>
\`\`\`

This will style text in one of predefined ways:
`

export default {
  title: `${paths.typography}/Basic`,
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
    color: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    decorators: {
      table: {
        disable: true,
      },
    },
    tag: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    weight: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      source: {
        type: "dynamic",
      },
      page: (): JSX.Element => (
        <>
          <Title>Style</Title>
          <Subtitle>Basic typography</Subtitle>
          <Description markdown={description} />
          <Stories title="" includePrimary />
        </>
      ),
    },
  },
}

export const HeadingPrimary = storyCreator({
  variant: TextVariant.HeadingPrimary,
})

export const HeadingSecondary = storyCreator({
  variant: TextVariant.HeadingSecondary,
})

export const HeadingTertiary = storyCreator({
  variant: TextVariant.HeadingTertiary,
})

export const HeadingQuaternary = storyCreator({
  variant: TextVariant.HeadingQuaternary,
})

export const LargeBold = storyCreator({
  variant: TextVariant.LargeBold,
})

export const Large = storyCreator({
  variant: TextVariant.Large,
})

export const BasicBold = storyCreator({
  variant: TextVariant.BasicBold,
})

export const Basic = storyCreator({
  variant: TextVariant.Basic,
})

export const BasicGrey = storyCreator({
  variant: TextVariant.BasicGrey,
})

export const SmallBold = storyCreator({
  variant: TextVariant.SmallBold,
})

export const Small = storyCreator({
  variant: TextVariant.Small,
})

export const SmallLight = storyCreator({
  variant: TextVariant.SmallLight,
})

export const SmallGrey = storyCreator({
  variant: TextVariant.SmallGrey,
})

export const SmallLightGrey = storyCreator({
  variant: TextVariant.SmallLightGrey,
})

export const TinyBold = storyCreator({
  variant: TextVariant.TinyBold,
})

export const Tiny = storyCreator({
  variant: TextVariant.Tiny,
})

export const TinyBoldGrey = storyCreator({
  variant: TextVariant.TinyBoldGrey,
})

export const TinyGrey = storyCreator({
  variant: TextVariant.TinyGrey,
})
