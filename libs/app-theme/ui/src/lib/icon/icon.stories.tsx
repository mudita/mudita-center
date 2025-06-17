/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react-vite"
import { storybookHelper } from "app-theme/utils"
import { IconSize, IconType } from "app-theme/models"
import styled from "styled-components"
import { Icon } from "./icon"
import { Fragment } from "react"

const Decorator = styled.div`
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
`

const AllIconsDecorator = styled.div`
  display: grid;
  align-self: flex-start;
  justify-self: flex-start;
  grid-template-columns: auto 5rem;
  align-items: center;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  column-gap: 2.4rem;
  row-gap: 0.5rem;
`

const meta: Meta<typeof Icon> = {
  title: "UI/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `<Icon>` component is a wrapper for icons designed by Mudita.",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
  argTypes: {
    type: storybookHelper
      .assignCategory("Styles")
      .addDescription("Defines the icon type.")
      .generateEnumSelector(IconType, "IconType")
      .apply(),
    size: storybookHelper
      .assignCategory("Styles")
      .addDescription(
        "Defines the size of the icon.\n\n" +
          "The `IconSize.AutoMax` size will set the button size to the maximum available space."
      )
      .generateEnumSelector(IconSize, "IconSize")
      .apply(),
  },
  args: {
    type: IconType.Close,
    size: IconSize.Medium,
  },
  parameters: {
    docs: {
      source: {
        code: `<Icon type={IconType.Close} />`,
      },
    },
  },
}

export const ColoredIcon: Story = {
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
          "The icon color is inherited from the parent component. By default, it is black.",
      },
      source: {
        code:
          "<div style={{ color: 'red' }}>\n" +
          "  <Icon type={IconType.Close} />\n" +
          "</div>",
      },
    },
  },
  render: () => (
    <div style={{ color: "red" }}>
      <Icon type={IconType.Close} />
    </div>
  ),
}

export const IconSizes: Story = {
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
        code: Object.keys(IconSize)
          .map((key) => `<Icon type={IconType.Close} size={IconSize.${key}} />`)
          .join("\n"),
      },
    },
  },
  render: () => (
    <>
      {Object.values(IconSize).map((size) => (
        <Icon key={size} type={IconType.Close} size={size} />
      ))}
    </>
  ),
}

export const AllIcons: Story = {
  decorators: [
    (Story) => (
      <AllIconsDecorator>
        <Story />
      </AllIconsDecorator>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: Object.keys(IconType)
          .map((key) => `<Icon type={IconType.${key}} />`)
          .join("\n"),
      },
    },
  },
  render: () => (
    <>
      {Object.entries(IconType).map(([key, value]) => (
        <Fragment key={value}>
          <code>IconType.{key}</code>
          <Icon type={value} size={IconSize.Big} />
        </Fragment>
      ))}
    </>
  ),
}
