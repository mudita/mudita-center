/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { storybookHelper } from "app-theme/utils"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import styled from "styled-components"
import { action } from "@storybook/addon-actions"

const MainDecorator = styled.div`
  align-self: center;
  justify-self: center;
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
`

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MainDecorator>
        <Story />
      </MainDecorator>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "The `<Button>` component is a multipurpose button that can be used for various actions in the application." +
          "It can be used as a regular button or as a link, depending on the provided props:\n" +
          "- as a regular `<button>` with an `onClick` handler,\n" +
          "- as a [React Router's Link](https://reactrouter.com/api/components/Link) component with a `to` prop.\n\n" +
          "There is also a similar `<IconButton />` component, designed specifically for displaying icon buttons.\n" +
          "To read more about it, see the [IconButton](/docs/ui-iconbutton--docs) documentation.\n\n",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  argTypes: {
    text: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the text displayed on the button.\n\n" +
          "If the `children` prop is provided, this prop will be ignored."
      )
      .apply(),
    icon: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the icon displayed inside the button, on the left side of the text."
      )
      .generateEnumSelector(IconType, "IconType", true)
      .apply(),
    to: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the link or route to navigate to when the button is clicked. " +
          "If provided, the button will behave as a link.\n\n" +
          "It accepts the same values as the `to` prop of the [Link](https://reactrouter.com/api/components/Link#to) component."
      )
      .apply({
        table: {
          type: {
            summary: "string | object | undefined",
            detail:
              "string | { pathname?: string; search?: string; hash?: string } | undefined",
          },
        },
      }),
    onClick: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the click handler for the button. \n\n" +
          "If the `to` prop is provided, this handler will be ignored."
      )
      .apply(),
    disabled: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines whether the button is disabled or not.")
      .apply(),
    type: storybookHelper
      .assignCategory("Styles")
      .addDescription("Defines the style of the button.")
      .generateEnumSelector(ButtonType, "ButtonType")
      .apply(),
    size: storybookHelper
      .assignCategory("Styles")
      .addDescription(
        "Defines the size of the button.\n\n" +
          "The `ButtonSize.AutoMax` size will set the button width to the maximum available space.\n\n" +
          "The `ButtonSize.AutoMin` size will set the button width to the minimum space required by its content.\n\n"
      )
      .generateEnumSelector(ButtonSize, "ButtonSize")
      .apply(),
    children: storybookHelper.disableControl().apply(),
  },
  args: {
    type: ButtonType.Primary,
    size: ButtonSize.AutoMax,
    text: "Default button",
    icon: undefined,
    to: undefined,
    onClick: action("button clicked"),
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<Button>Primary button</Button>`,
      },
    },
  },
}

export const ButtonStyles: Story = {
  parameters: {
    docs: {
      source: {
        code:
          '<Button type={ButtonType.Primary} text="Primary button" />\n' +
          '<Button type={ButtonType.Secondary} text="Secondary button" />\n' +
          '<Button type={ButtonType.Tertiary} text="Tertiary button" />\n',
      },
    },
  },
  render: () => (
    <>
      <Button type={ButtonType.Primary} text="Primary button" />
      <Button type={ButtonType.Secondary} text="Secondary button" />
      <Button type={ButtonType.Tertiary} text="Tertiary button" />
    </>
  ),
}

export const DisabledButtonStyles: Story = {
  parameters: {
    docs: {
      source: {
        code:
          '<Button type={ButtonType.Primary} disabled={true} text="Primary button" />\n' +
          '<Button type={ButtonType.Secondary} disabled={true} text="Secondary button" />\n' +
          '<Button type={ButtonType.Tertiary} disabled={true} text="Tertiary button" />\n',
      },
    },
  },
  render: () => (
    <>
      <Button type={ButtonType.Primary} disabled={true} text="Primary button" />
      <Button
        type={ButtonType.Secondary}
        disabled={true}
        text="Secondary button"
      />
      <Button
        type={ButtonType.Tertiary}
        disabled={true}
        text="Tertiary button"
      />
    </>
  ),
}

export const ButtonSizes: Story = {
  parameters: {
    docs: {
      source: {
        code:
          '<Button size={ButtonSize.Small} text="Small" />\n' +
          '<Button size={ButtonSize.Medium} text="Medium" />\n' +
          '<Button size={ButtonSize.Large} text="Large" />\n' +
          '<Button size={ButtonSize.AutoMin} text="Auto min" />\n' +
          '<Button size={ButtonSize.AutoMax} text="Auto max" />\n',
      },
    },
  },
  render: () => (
    <>
      <Button size={ButtonSize.Small} text="Small" />
      <Button size={ButtonSize.Medium} text="Medium" />
      <Button size={ButtonSize.Large} text="Large" />
      <Button size={ButtonSize.AutoMin} text="Auto min" />
      <Button size={ButtonSize.AutoMax} text="Auto max" />
    </>
  ),
}

export const ButtonsWithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code:
          "<Button icon={IconType.Spinner} text='Saving...' />\n" +
          "<Button type={ButtonType.Secondary} icon={IconType.Spinner} text='Saving...' />\n" +
          "<Button type={ButtonType.Tertiary} icon={IconType.Spinner} text='Saving...' />\n",
      },
    },
  },
  render: () => (
    <>
      <Button icon={IconType.Spinner} text="Saving..." />
      <Button
        type={ButtonType.Secondary}
        icon={IconType.Spinner}
        text="Saving..."
      />
      <Button
        type={ButtonType.Tertiary}
        icon={IconType.Spinner}
        text="Saving..."
      />
    </>
  ),
}
