/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import type { Meta, StoryObj } from "@storybook/react"
import { storybookHelper } from "app-theme/utils"
import { ContactSupportFormModal } from "./contact-support-form-modal"

const Decorator = styled.div`
  width: 100%;
  height: 100%;

  .ReactModalPortal {
    width: 100%;
    height: 100%;
  }

  .ReactModal__Overlay {
    width: 100%;
    height: 100%;
    position: relative !important;
    padding: 2rem !important;
    box-sizing: border-box !important;
  }
`

const meta: Meta<typeof ContactSupportFormModal> = {
  title: "App/Contact Support/Form Modal",
  component: ContactSupportFormModal,
  decorators: [
    (Story) => (
      <Decorator className={"story-decorator"}>
        <Story />
      </Decorator>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ContactSupportFormModal>

export const Default: Story = {
  args: {
    files: [{ name: "22-10-05 MuditaCenter.zip" }],
  },
  argTypes: {
    files: storybookHelper
      .addDescription(
        "Defines an array of files to be displayed in the modal. Each file should have a `name` property."
      )
      .setType("array")
      .apply({
        control: {
          type: "object",
        },
      }),
    onClose: storybookHelper
      .addDescription(
        "Defines a function to be called when clicking the close button or backdrop."
      )
      .apply({
        control: {
          disable: true,
        },
      }),
    onSubmit: storybookHelper
      .addDescription(
        "Defines a function to be called when the form is submitted. It receives the form data as an argument."
      )
      .apply({
        control: {
          disable: true,
        },
      }),
  },
}
