/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import type { Meta, StoryObj } from "@storybook/react"
import { FunctionComponent } from "react"
import { color } from "./color"

const Decorator = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5rem;
`

const Section = styled.div`
  width: 100%;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, 15rem);
`

const ColorBox = styled.div<{ $color: string }>`
  width: 12rem;
  height: 5rem;
  border-radius: 0.4rem;
  background-color: ${({ $color }) => $color};
  border: 1px solid ${({ theme }) => theme.app.color.grey5};
  display: flex;
  align-items: center;
  justify-content: center;
`

const ColorWrapper = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.4rem;
    font-weight: 400;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 400;
    margin: 0 0 1rem;
  }
`

const Color: FunctionComponent<{ name: string; color: string }> = ({
  name,
  color,
}) => {
  return (
    <ColorWrapper>
      <h2>{name}</h2>
      <h3>{color}</h3>
      <ColorBox $color={color} />
    </ColorWrapper>
  )
}

const colorsList = Object.entries(color).flatMap(([name, value]) => {
  if (typeof value === "object") {
    return Object.entries(value)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => {
        return {
          name: `${name}.${key}`,
          value: value as string,
        }
      })
  }
  return {
    name,
    value,
  }
})

const meta: Meta<typeof Color> = {
  title: "UI/Colors",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Colors are available through Styled Components theming system, " +
          "so they can be used in any component that is wrapped with `AppThemeProvider`:\n\n" +
          "```tsx\n" +
          "import styled from 'styled-components'\n\n" +
          "const SomeComponent = styled.div`\n" +
          "  background-color: ${({ theme }) => theme.app.color.black};\n" +
          "`\n" +
          "```\n\n" +
          "They can also be accessed through the `theme` object imported from `app-theme/utils` library, " +
          "but this is not a recommended way of accessing colors inside styled-components. " +
          "This approach should be used only in other contexts like functions, external libraries customization" +
          " or inline styles:\n\n" +
          "```tsx\n" +
          "import { SomeComponent } from 'some-library'\n" +
          "import { theme } from 'app-theme/utils'\n\n" +
          "<SomeComponent\n" +
          "  mainColor={theme.app.color.grey4}\n" +
          "/>\n" +
          "```\n",
      },
    },
  },
}

export default meta

const blackAndWhiteColors = colorsList.filter(
  ({ name }) => name.startsWith("black") || name.startsWith("white")
)

const greyColors = colorsList.filter(({ name }) => name.startsWith("grey"))
const blueColors = colorsList.filter(({ name }) => name.startsWith("blue"))
const greenColors = colorsList.filter(({ name }) => name.startsWith("green"))
const redColors = colorsList.filter(({ name }) => name.startsWith("red"))
const orangeColors = colorsList.filter(({ name }) => name.startsWith("orange"))

export const Default: StoryObj<typeof Color> = {
  parameters: {
    docs: {
      source: {
        code:
          "import { ColorBox } from 'neverland'\n" +
          "import { theme } from 'app-theme/utils'\n\n" +
          [
            ...blackAndWhiteColors,
            ...greyColors,
            ...blueColors,
            ...greenColors,
            ...redColors,
            ...orangeColors,
          ]
            .map(({ name }) => {
              return `<ColorBox color="theme.app.color.${name}" />`
            })
            .join("\n"),
      },
    },
  },
  render: () => (
    <>
      {[
        blackAndWhiteColors,
        greyColors,
        blueColors,
        greenColors,
        redColors,
        orangeColors,
      ].map((colors, index) => (
        <Section key={index}>
          {colors.map((color) => (
            <Color key={color.name} name={color.name} color={color.value} />
          ))}
        </Section>
      ))}
    </>
  ),
}
