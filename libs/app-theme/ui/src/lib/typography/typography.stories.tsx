/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import styled, { css } from "styled-components"
import { Typography } from "./typography"
import { BaseTypography } from "./base-typography"
import { storybookHelper } from "app-theme/utils"
import {
  TypographyAlign,
  TypographyModifier,
  TypographyTransform,
} from "app-theme/models"
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/blocks"
import { BytesFormatter } from "./bytes-formatter/bytes-formatter"
// eslint-disable-next-line @nx/enforce-module-boundaries
import { color } from "../../../../utils/src/lib/app-theme/color"

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

const Decorator = styled.div<{ $border?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 40rem;
  ${({ $border, theme }) =>
    $border &&
    css`
      border: dashed 0.1rem ${theme.app.color.grey4};
    `}
`

const AllDecorator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  > * {
    border-bottom: dashed 0.1rem ${({ theme }) => theme.app.color.grey4};
    border-top: dashed 0.1rem ${({ theme }) => theme.app.color.grey4};
  }
`

const meta: Meta<typeof BaseTypography> = {
  title: "UI/Typography",
  component: BaseTypography,
  tags: ["autodocs"],
  argTypes: {
    as: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the HTML tag to be used instead of the default one for given typography.\n\n" +
          "**Important!** `<Typography />` components wrapped in another styled-component must use `forwardedAs` prop instead.\n\n"
      )
      .apply({
        control: {
          disable: true,
        },
      }),
    title: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines a custom HTML `title` prop.\n\n" +
          "Defaults to text content. It's assigned only when text does not fit in the container."
      )
      .apply(),
    textTransform: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the visual text transformation style.")
      .generateEnumSelector(TypographyTransform, "TypographyTransform", {
        optional: true,
      })
      .apply(),
    lines: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the number of lines to be displayed. Must be a number greater than 0.\n\n" +
          "If text will take more space, it will be truncated and ended with ellipsis. " +
          "Full text can be displayed on hover, using the HTML `title` prop.\n\n"
      )
      .apply(),
    modifier: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the extra formatting style:\n\n" +
          "- `FormatBytes` - formats the bytes to a human-readable format (e.g. 1.2 MB, 1.5 GB, 2.3 TB). " +
          "Text content must be parseable to `number` type using the `Number` method from JS.\n\n"
      )
      .generateEnumSelector(TypographyModifier, "TypographyModifier", {
        optional: true,
      })
      .apply(),
    minUnit: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the minimum unit for the `TypographyModifier.FormatBytes` modifier. " +
          "Currently only `B`, `KB`, `MB`, `GB`, and `TB` are supported."
      )
      .setType("string")
      .apply({
        options: ["B", "KB", "MB", "GB", "TB"],
        control: {
          type: "select",
        },
        if: {
          arg: "modifier",
          eq: TypographyModifier.FormatBytes,
        },
      }),
    textAlign: storybookHelper
      .assignCategory("Styles")
      .addDescription("Defines the text alignment style.")
      .generateEnumSelector(TypographyAlign, "TypographyAlign", {
        optional: true,
      })
      .apply(),
    color: storybookHelper
      .assignCategory("Styles")
      .addDescription("Defines custom text color.")
      .setType("AppColor")
      .apply({
        options: colorsList.map((color) => color.name),
        control: {
          type: "select",
        },
      }),
    unbold: storybookHelper
      .assignCategory("Styles")
      .addDescription(
        "Defines whether the text bold styles should be removed or not."
      )
      .apply(),
    message: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the translation key ID.\n\n" +
          "When provided another prop `values` will be available for passing the variables to the translation function.\n\n" +
          "This also disables the `children` support."
      )
      .apply({
        control: {
          type: "text",
        },
      }),
    values: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the variables for given translation key.")
      .setType("Object", "Record<string, string | number | boolean>")
      .apply({
        control: {
          type: "object",
        },
        if: {
          arg: "message",
          neq: undefined,
        },
      }),
  },
  args: {
    unbold: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `<Typography />` component is a main component for displaying text in the app.\n\n" +
          "The component itself returns nothing. It must be used in a combination with specific headline or paragraph, using dot-notation. " +
          "For example: `<Typography.H1 />`, `<Typography.P1 />`.",
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
  },
}

export default meta

type Story = StoryObj<typeof Typography>

export const Default: Story = {
  decorators: [
    (Story) => (
      <AllDecorator>
        <Story />
      </AllDecorator>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: Object.keys(Typography)
          .map((key) => {
            return `<Typography.${key}>Typography.${key}</Typography.${key}>\n`
          })
          .join(""),
      },
    },
  },
  render: (args) => {
    return (
      <>
        {Object.keys(Typography).map((key) => {
          if (key === "LI") {
            return null
          }
          const Component = Typography[key as keyof typeof Typography]
          return (
            <Component key={key} {...args}>
              Typography.{key}
            </Component>
          )
        })}
      </>
    )
  },
}

export const Lists: Story = {
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
        story:
          "In order to display a bullet or numbered list, a given `<Typography />` component must have " +
          'the `as="ul"` or `as="ol"` prop assigned.\n\n' +
          "Then, each list item must be wrapped in `<Typography.LI />` component to provide proper styles and " +
          "support for custom features. It will also inherit base text styles from the parent (`ul` or `ol`) component.",
      },
      source: {
        code:
          '<Typography.P1 as="ul">\n' +
          "  <Typography.LI>List item 1 with P1 styles</Typography.LI>\n" +
          "  <Typography.LI>List item 2 with P1 styles</Typography.LI>\n" +
          "  <Typography.LI>List item 3 with P1 styles</Typography.LI>\n" +
          "</Typography.P1>\n\n" +
          '<Typography.P2 as="ol">\n' +
          "  <Typography.LI>List item 1 with P2 styles</Typography.LI>\n" +
          "  <Typography.LI>List item 2 with P2 styles</Typography.LI>\n" +
          "  <Typography.LI>List item 3 with P2 styles</Typography.LI>\n" +
          "</Typography.P2>",
      },
    },
  },
  render: (args) => {
    return (
      <>
        <Typography.P1 as="ul" {...args}>
          <Typography.LI>List item 1 with P1 styles</Typography.LI>
          <Typography.LI>List item 2 with P1 styles</Typography.LI>
          <Typography.LI>List item 3 with P1 styles</Typography.LI>
        </Typography.P1>
        <Typography.P2 as="ol" {...args}>
          <Typography.LI>List item 1 with P2 styles</Typography.LI>
          <Typography.LI>List item 2 with P2 styles</Typography.LI>
          <Typography.LI>List item 3 with P2 styles</Typography.LI>
        </Typography.P2>
      </>
    )
  },
}

export const Translations: Story = {
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
        story:
          "The `message` prop is used for translation purposes. " +
          "It accepts a translation key ID defined in `en-US.json` file. " +
          "The additional `values` prop is used for passing variables to the translation function.\n\n" +
          "When `message` prop is used, the `children` prop will be ignored.",
      },
      source: {
        code: '<Typography.P1 message="menu.app.title" />\n',
      },
    },
  },
  render: (args) => {
    return <Typography.P1 {...args} message="menu.app.title" />
  },
}

export const LimitedLines: Story = {
  decorators: [
    (Story) => (
      <Decorator $border>
        <Story />
      </Decorator>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: "<Typography.P1 lines={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography.P1>\n",
      },
    },
  },
  render: (args) => {
    return (
      <Typography.P1 {...args} lines={2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Typography.P1>
    )
  },
}

export const TextTransform: Story = {
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code:
          '<Typography.P1 textTransform="capitalize">capitalize first letter of each word</Typography.P1>\n' +
          '<Typography.P1 textTransform="uppercase">all letters uppercase</Typography.P1>\n' +
          '<Typography.P1 textTransform="lowercase">all letters lowercase</Typography.P1>\n' +
          '<Typography.P1 textTransform="capitalize-first-letter">capitalize first letter only</Typography.P1>\n',
      },
    },
  },
  render: (args) => {
    return (
      <>
        <Typography.P1 {...args} textTransform={TypographyTransform.Capitalize}>
          capitalize first letter of each word
        </Typography.P1>
        <Typography.P1 {...args} textTransform={TypographyTransform.Uppercase}>
          all letters uppercase
        </Typography.P1>
        <Typography.P1 {...args} textTransform={TypographyTransform.Lowercase}>
          all letters lowercase
        </Typography.P1>
        <Typography.P1
          {...args}
          textTransform={TypographyTransform.CapitalizeFirstLetter}
        >
          capitalize first letter only
        </Typography.P1>
      </>
    )
  },
}

export const TextAlign: Story = {
  decorators: [
    (Story) => (
      <Decorator $border>
        <Story />
      </Decorator>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code:
          "<Typography.P1 textAlign={TypographyAlign.Left}>left aligned</Typography.P1>\n" +
          "<Typography.P1 textAlign={TypographyAlign.Right}>right aligned</Typography.P1>\n" +
          "<Typography.P1 textAlign={TypographyAlign.Center}>center aligned</Typography.P1>\n" +
          "<Typography.P1 textAlign={TypographyAlign.Justify}>justified</Typography.P1>\n",
      },
    },
  },
  render: (args) => {
    return (
      <>
        <Typography.P1 {...args} textAlign={TypographyAlign.Left}>
          left aligned
        </Typography.P1>
        <Typography.P1 {...args} textAlign={TypographyAlign.Right}>
          right aligned
        </Typography.P1>
        <Typography.P1 {...args} textAlign={TypographyAlign.Center}>
          center aligned
        </Typography.P1>
        <Typography.P1 {...args} textAlign={TypographyAlign.Justify}>
          justified
        </Typography.P1>
      </>
    )
  },
}

export const Unbold: Story = {
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code:
          "<Typography.H3 unbold>Typography.H3 - unbold</Typography.H3>\n" +
          "<Typography.H3>Typography.H3 - default</Typography.H3>\n",
      },
    },
  },
  render: (args) => {
    return (
      <>
        <Typography.H3 {...args} unbold>
          Typography.H3 - unbold
        </Typography.H3>
        <Typography.H3 {...args}>Typography.H3 - default</Typography.H3>
      </>
    )
  },
}

export const Color: Story = {
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
        story:
          "The `color` prop is used to define the text color. It accepts any color from the theme. " +
          "The default color may vary depending on the exact `<Typography />` used.\n\n" +
          "There's an addittional `currentColor` value that can be used to inherit the color from the parent element. " +
          "It's useful in cases like changing color depending on some state, without a need of manually switchich the value of `color` prop.",
      },
      source: {
        code:
          '<Typography.P1 color="blue1">\n' +
          "  blue1\n" +
          "</Typography.P1>\n" +
          '<Typography.P1 color="red">\n' +
          "  red\n" +
          "</Typography.P1>\n" +
          '<div style={{ color: "green" }}>\n' +
          '  <Typography.P1 color="currentColor">\n' +
          "    inherits green color from the parent\n" +
          "  </Typography.P1>\n" +
          "  <Typography.P1>\n" +
          "    uses default color of Typography.P1\n" +
          "  </Typography.P1>\n" +
          "</div>",
      },
    },
  },
  render: (args) => {
    return (
      <>
        <Typography.P1 {...args} color="blue1">
          blue1
        </Typography.P1>
        <Typography.P1 {...args} color="red">
          red
        </Typography.P1>
        <div style={{ color: "green" }}>
          <Typography.P1 {...args} color="currentColor">
            inherits green color from the parent
          </Typography.P1>
          <Typography.P1 {...args}>
            uses default color of Typography.P1
          </Typography.P1>
        </div>
      </>
    )
  },
}

export const CustomTag: Story = {
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
        story:
          "The `as` prop can be used to define a custom HTML tag to be used instead of the default one. " +
          "This is useful when you want to use a different HTML element for semantic purposes.\n\n" +
          'For example, you can use `as="p"` to render the component as a paragraph instead of a heading,' +
          " while keeping the heading styles.\n\n" +
          "However, due to how styled-components work, `<Typography />` component wrapped in another styled-component" +
          " must use the `forwardedAs` prop instead.\n\n",
      },
      source: {
        code:
          "const EnhancedTypography = styled(Typography.H3)`\n" +
          "  text-decoration: line-through;\n" +
          "`\n" +
          '<Typography.H3 as="p">Typography.H3 as p</Typography.H3>\n\n' +
          '<EnhancedTypography forwardedAs="p">Typography.H3 as p with custom styles</EnhancedTypography>\n',
      },
    },
  },
  render: (args) => {
    const EnhancedTypography = styled(Typography.H3)`
      text-decoration: line-through;
    `
    return (
      <>
        <Typography.H3 {...args} as="p">
          Typography.H3 as p
        </Typography.H3>
        <EnhancedTypography forwardedAs="p">
          Typography.H3 as p with custom styles
        </EnhancedTypography>
      </>
    )
  },
}

export const BytesModifier: Story = {
  name: "Modifier - FormatBytes",
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
        story:
          "The `TypographyModifier.FormatBytes` modifier formats the text content as bytes " +
          "and converts it to a human-readable format (e.g. 1.2 MB, 1.5 GB, 2.3 TB).\n" +
          "When using this modifier, the additional `minUnit` prop can be used to define " +
          "the minimum unit used in the conversion. The final unit will be calculated automatically, " +
          "based on the provided value.\n" +
          "The `minUnit` can be one of the following: `B`, `KB`, `MB`, `GB`, `TB`.\n\n" +
          "This modifier parses each child separately, but only those being pure numbers " +
          "or strings parseable***** to numbers will be converted.\n" +
          "Any other content will be displayed as is. This allows for mixing numbers and text in the same component.\n\n" +
          "***** Parseable means that the string can be converted to a number type using the `Number` method from JS.\n\n",
      },
      source: {
        code:
          "<Typography.P1 modifier={TypographyModifier.FormatBytes}>\n" +
          "  700\n" +
          '  <Typography.P2 as={"span"}> (700 bytes, default unit)</Typography.P2>\n' +
          "</Typography.P1>\n" +
          '<Typography.P1 modifier={TypographyModifier.FormatBytes} minUnit={"KB"}>\n' +
          "  700\n" +
          '  <Typography.P2 as={"span"}> (700 bytes, min unit KB)</Typography.P2>\n' +
          "</Typography.P1>\n" +
          '<Typography.P1 modifier={TypographyModifier.FormatBytes} minUnit={"MB"}>\n' +
          "  700\n" +
          '  <Typography.P2 as={"span"}> (700 bytes, min unit MB)</Typography.P2>\n' +
          "</Typography.P1>\n" +
          "<Typography.P1 modifier={TypographyModifier.FormatBytes}>\n" +
          "  70000000\n" +
          '  <Typography.P2 as={"span"}> (70000000 bytes, default unit)</Typography.P2>\n' +
          "</Typography.P1>\n",
      },
    },
  },
  render: (args) => {
    return (
      <>
        <Typography.P1 {...args} modifier={TypographyModifier.FormatBytes}>
          700
          <Typography.P2 as={"span"}> (700 bytes, default unit)</Typography.P2>
        </Typography.P1>
        <Typography.P1
          {...args}
          modifier={TypographyModifier.FormatBytes}
          minUnit={"KB"}
        >
          700
          <Typography.P2 as={"span"}> (700 bytes, min unit KB)</Typography.P2>
        </Typography.P1>
        <Typography.P1
          {...args}
          modifier={TypographyModifier.FormatBytes}
          minUnit={"MB"}
        >
          700
          <Typography.P2 as={"span"}> (700 bytes, min unit MB)</Typography.P2>
        </Typography.P1>
        <Typography.P1 {...args} modifier={TypographyModifier.FormatBytes}>
          70000000
          <Typography.P2 as={"span"}>
            {" "}
            (70000000 bytes, default unit)
          </Typography.P2>
        </Typography.P1>
      </>
    )
  },
}

export const StandaloneBytesFormatter: StoryObj<typeof BytesFormatter> = {
  name: "BytesFormatter - standalone",
  parameters: {
    docs: {
      description: {
        story:
          "There is also a standalone `<BytesFormatter />` component for formatting bytes that can be used independently. " +
          "It accepts same `minUnit` prop as in `Typography` component, " +
          "but it can't parse content other than numeric values (or its string representataion).\n\n" +
          "It doesn't provide any styling nor translation support and doesn't wrap the content in any HTML tag.\n\n",
      },
      source: {
        code:
          "<Typography.P1>\n" +
          "  <BytesFormatter minUnit={'GB'}>700000000</BytesFormatter>\n" +
          "  <br />\n" +
          "  <BytesFormatter minUnit={'GB'}>700000000 (this won't work)</BytesFormatter>\n" +
          "</Typography.P1>\n",
      },
    },
  },
  render: () => {
    return (
      <Typography.P1>
        <BytesFormatter minUnit={"GB"}>700000000</BytesFormatter>
        <br />
        <BytesFormatter minUnit={"GB"}>
          700000000 (this won't work)
        </BytesFormatter>
      </Typography.P1>
    )
  },
}
