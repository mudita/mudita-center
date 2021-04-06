import React, { ComponentProps } from "react"
import { Meta, Story } from "@storybook/react"
import { Spacing, getSpacing, theme } from "../../.."
import {
  Title,
  Subtitle,
  Description,
  Stories,
} from "@storybook/addon-docs/blocks"
import { SpaceBox } from "./spacing.component"
import { paths } from "../../../../.storybook/paths"

const description = `
Theme provider exports a \`getSpacing\` function that accepts one argument which is a size and returns \`rem\` representation of that size.

\`\`\`TSX
getSpacing("24"); // 2.4rem

const SomeStyledComponent = styled("p")\`
  margin: \${getSpacing("8")};
\`
\`\`\`

Sizes are always a multiplication of \`4\` but there are only several values available in theme:

\`\`\`TSX
const spacing = {
  "0": "0",
  "4": ".4rem",
  "8": ".8rem",
  "12": "1.2rem",
  "16": "1.6rem",
  "20": "2rem",
  "24": "2.4rem",
  "32": "3.2rem",
  "40": "4rem",
  "48": "4.8rem",
  "60": "6rem",
  "64": "6.4rem",
}
\`\`\`
`

export default {
  title: `${paths.spacing}`,
  component: SpaceBox,
  argTypes: {
    size: {
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
    backgrounds: {
      default: "White",
    },
    docs: {
      page: (): JSX.Element => (
        <>
          <Title>Style</Title>
          <Subtitle>Spacing</Subtitle>
          <Description markdown={description} />
          <Stories title="" includePrimary />
        </>
      ),
    },
  },
} as Meta

const Template: Story<ComponentProps<typeof SpaceBox>> = (props) => (
  <SpaceBox {...props} />
)

const storyCreator = (size: Spacing): Story<{ size: Spacing }> => {
  const Story = Template.bind({})
  Story.args = {
    size,
  }
  Story.parameters = {
    docs: {
      description: {
        story: `\`size("${size}") // ${getSpacing(size)({ theme })}\``,
      },
    },
  }
  return Story
}

export const Spacing0 = storyCreator("0")
export const Spacing4 = storyCreator("4")
export const Spacing8 = storyCreator("8")
export const Spacing12 = storyCreator("12")
export const Spacing16 = storyCreator("16")
export const Spacing20 = storyCreator("20")
export const Spacing24 = storyCreator("24")
export const Spacing32 = storyCreator("32")
export const Spacing40 = storyCreator("40")
export const Spacing48 = storyCreator("48")
export const Spacing60 = storyCreator("60")
export const Spacing64 = storyCreator("64")
