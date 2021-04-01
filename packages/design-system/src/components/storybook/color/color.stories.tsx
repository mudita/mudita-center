import React, { ComponentProps } from "react"
import { Story } from "@storybook/react"
import { paths } from "Storybook/paths"
import { getColor } from "Theme/theme-getters"
import { theme } from "Theme/theme-provider"
import {
  Title,
  Subtitle,
  Description,
  Stories,
} from "@storybook/addon-docs/blocks"
import { ColorBox } from "Components/storybook/color/color.component"
import { Color } from "Theme/color"

const description = `
Theme provider exports a \`color\` function that accepts a color name and returns color value (hex, rgb, etc.):

\`\`\`TSX
color("black") // #000000
\`\`\`

Available color names are equal to the \`color\` object keys defined in theme:

\`\`\`TSX
const color = {
  black: "#000000",
  white: "#ffffff",

  // Grey
  grey100: "#fbfbfb",
  grey200: "#f4f5f6",
  grey300: "#e9e9e9",
  grey400: "#d2d6db",
  grey500: "#cdcecf",
  grey600: "#a5a5a5",
  grey700: "#6a6a6a",
  grey800: "#3b3f42",
  greyA100: "rgba(214, 214, 214, .5)",
  greyA200: "rgba(188, 188, 188, .5)",

  // Blue
  blue100: "#f3f8fc",
  blue200: "#e3f3ff",
  blue300: "#aebec9",
  blue400: "#94a2ae",
  blue500: "#6d9bbc",
  blue600: "#3e6988",
  blueA100: "rgba(148, 162, 174, .2)",

  // Red
  red: "#e96a6a",
}
\`\`\`
`

export default {
  title: `${paths.color}`,
  component: ColorBox,
  argTypes: {
    color: {
      description: "Color name as key of `color` object defined in theme.",
      control: {
        type: "select",
        options: Object.keys(theme.color),
      },
      table: {
        type: {
          summary: "Color",
          detail: '"grey100", "red", "black", "blue500", ...',
        },
      },
    },
    text: {
      control: "text",
      defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
          <Subtitle>Colors</Subtitle>
          <Description markdown={description} />
          <Stories title="" includePrimary />
        </>
      ),
    },
  },
}

const Template: Story<ComponentProps<typeof ColorBox>> = (props) => (
  <ColorBox {...props} />
)

const storyCreator = (color: Color) => {
  const Story = Template.bind({})
  Story.args = {
    color,
  }
  Story.parameters = {
    docs: {
      description: {
        story: `\`color("${color}") // ${getColor(color)({ theme })}\``,
      },
    },
  }
  return Story
}

export const Black = storyCreator("black")

export const Grey100 = storyCreator("grey100")
export const Grey200 = storyCreator("grey200")
export const Grey300 = storyCreator("grey300")
export const Grey400 = storyCreator("grey400")
export const Grey500 = storyCreator("grey500")
export const Grey600 = storyCreator("grey600")
export const Grey700 = storyCreator("grey700")
export const Grey800 = storyCreator("grey800")
export const GreyA100 = storyCreator("greyA100")
export const GreyA200 = storyCreator("greyA200")

export const Red = storyCreator("red")

export const Blue100 = storyCreator("blue100")
export const Blue200 = storyCreator("blue200")
export const Blue300 = storyCreator("blue300")
export const Blue400 = storyCreator("blue400")
export const Blue500 = storyCreator("blue500")
export const Blue600 = storyCreator("blue600")
export const BlueA100 = storyCreator("blueA100")
