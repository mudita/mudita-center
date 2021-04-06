import React from "react"
import { paths } from "../../../../.storybook/paths"
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks"
import { Text, TextVariant } from "../../.."
import { storyCreator } from "./typography.helpers"
import { Meta } from "@storybook/react"

const description = `
There is a \`<Text>\` component that allows to style texts in different ways.

The basic usage is very simple. Just wrap the \`Text\` tags around given content and put the \`variant\` property which is a \`TextVariant\` enum. For example:

\`\`\`TSX
<Text variant={TextVariant.PrimaryHeading}>
  Some text
</Text>
\`\`\`

Text can be styled in one of predefined ways:
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
      description:
        "One of predefined text styles. It also specifies which HTML tag is used to render the content.",
      table: {
        type: {
          summary: "TextVariant",
        },
      },
    },
    tag: {
      table: {
        disable: true,
      },
    },
    color: {
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
    decorators: {
      table: {
        disable: true,
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
} as Meta

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
