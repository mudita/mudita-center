/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { storybookHelper } from "app-theme/utils"
import { IconSize, IconType } from "app-theme/models"
import styled from "styled-components"
import { IconButton } from "./icon-button"
import { Default as DefaultButtonStory } from "../button/button.stories"

const Decorator = styled.div`
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  width: 10rem;

  h2 {
    margin: 0 0 -1.2rem;
  }
`

const meta: Meta<typeof IconButton> = {
  title: "UI/IconButton",
  component: IconButton,
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
          "The `<IconButton>` component is a wrapper for `<Button>` component ([read more](/docs/ui-button--docs)) providing own styles and functionality.\n" +
          "It has similar interface and also can be used as a regular button or as a link, depending on the provided props:\n" +
          "- as a regular `<button>` with an `onClick` handler,\n" +
          "- as a [React Router's Link](https://reactrouter.com/api/components/Link) component with a `to` prop.",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof IconButton>

const {
  type: argType,
  text: argText,
  ...buttonArgTypes
} = DefaultButtonStory.argTypes || {}
const { type, text, children, ...buttonArgs } = DefaultButtonStory.args || {}

export const Default: Story = {
  argTypes: {
    ...buttonArgTypes,
    size: storybookHelper
      .assignCategory("Styles")
      .addDescription(
        "Defines the size of the button.\n\n" +
          "The `IconSize.AutoMax` size will set the button size to the maximum available space."
      )
      .generateEnumSelector(IconSize, "IconSize")
      .apply(),
    icon: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the icon displayed inside the button.")
      .generateEnumSelector(IconType, "IconType")
      .apply(),
  },
  args: {
    ...buttonArgs,
    size: IconSize.Medium,
    icon: IconType.Close,
  },
  parameters: {
    docs: {
      source: {
        code: `<IconButton icon={IconType.Close}/>`,
      },
    },
  },
}

export const DisabledIconButton: Story = {
  args: {
    ...buttonArgs,
    size: IconSize.Medium,
    icon: IconType.Close,
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<IconButton icon={IconType.Close} disabled />`,
      },
    },
  },
}

export const IconButtonSizes: Story = {
  parameters: {
    docs: {
      source: {
        code: Object.keys(IconSize)
          .map(
            (key) =>
              `<IconButton icon={IconType.Close} size={IconSize.${key}} />`
          )
          .join("\n"),
      },
    },
  },
  render: () => (
    <>
      {Object.values(IconSize).map((size) => (
        <IconButton key={size} icon={IconType.Close} size={size} />
      ))}
    </>
  ),
}
