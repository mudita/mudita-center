/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import styled from "styled-components"
import { Typography } from "./typography"
import { BaseTypography } from "./base-typography"
import { storybookHelper } from "app-theme/utils"
import {
  TypographyAlign,
  TypographyModifier,
  TypographyTransform,
} from "app-theme/models"
// eslint-disable-next-line @nx/enforce-module-boundaries
import { colorsList } from "../../../../utils/src/lib/app-theme/colors.stories"

const Decorator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 25rem;
  border: dashed 0.1rem ${({ theme }) => theme.app.color.grey4};
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
    singleLine: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines whether the text should be displayed in a single line with ellipsis or not."
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
  },
  args: {
    singleLine: false,
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

export const SingleLine: Story = {
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
        code: "<Typography.P1 singleLine>Single line text too long to be displayed inside the container.</Typography.P1>\n",
      },
    },
  },
  render: (args) => {
    return (
      <Typography.P1 {...args} singleLine>
        Single line text too long to be displayed inside the container.
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
      <Decorator>
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
      source: {
        code:
          '<Typography.P1 color="blue1">blue1</Typography.P1>\n' +
          '<Typography.P1 color="red">red</Typography.P1>\n',
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
      </>
    )
  },
}

export const Modifier: Story = {
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
          '<Typography.P1 modifier="format-bytes">700</Typography.P1>\n' +
          '<Typography.P1 modifier="format-bytes" minUnit="KB">700</Typography.P1>\n' +
          '<Typography.P1 modifier="format-bytes" minUnit="MB">700</Typography.P1>\n' +
          '<Typography.P1 modifier="format-bytes">70000000</Typography.P1>\n',
      },
    },
  },
  render: (args) => {
    return (
      <>
        <Typography.P1 {...args} modifier={TypographyModifier.FormatBytes}>
          700
        </Typography.P1>
        <Typography.P1
          {...args}
          modifier={TypographyModifier.FormatBytes}
          minUnit={"KB"}
        >
          700
        </Typography.P1>
        <Typography.P1
          {...args}
          modifier={TypographyModifier.FormatBytes}
          minUnit={"MB"}
        >
          700
        </Typography.P1>
        <Typography.P1 {...args} modifier={TypographyModifier.FormatBytes}>
          70000000
        </Typography.P1>
      </>
    )
  },
}
