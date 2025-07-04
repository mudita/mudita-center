/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import type { Meta, StoryObj } from "@storybook/react"
import { storybookHelper } from "app-theme/utils"
import { Modal } from "app-theme/ui"
import { ContactSupportFormModal } from "./contact-support-form-modal"
import { ContactSupportErrorModal } from "./contact-support-error-modal"
import { ContactSupportSendingModal } from "./contact-support-sending-modal"
import { ContactSupportSuccessModal } from "./contact-support-success-modal"

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

const meta: Meta<typeof Modal> = {
  title: "App/Contact Support",
  component: Modal,
  decorators: [
    (Story) => (
      <Decorator className={"story-decorator"}>
        <Story />
      </Decorator>
    ),
  ],
}

export default meta

export const Default: StoryObj<typeof ContactSupportFormModal> = {
  name: "Form Modal",
  args: {
    opened: true,
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
  render: (args) => <ContactSupportFormModal {...args} />,
}

export const ContactSupportError: StoryObj<typeof ContactSupportErrorModal> = {
  name: "Error Modal",
  argTypes: {
    onClose: storybookHelper
      .addDescription(
        "Defines a function to be called when clicking the close button or backdrop."
      )
      .apply({
        control: {
          disable: true,
        },
      }),
  },
  args: {
    opened: true,
  },
  render: (args) => <ContactSupportErrorModal {...args} />,
}

export const ContactSupportSending: StoryObj<
  typeof ContactSupportSendingModal
> = {
  name: "Sending Modal",
  args: {
    opened: true,
  },
  render: (args) => <ContactSupportSendingModal {...args} />,
}

export const ContactSupportSuccess: StoryObj<
  typeof ContactSupportSuccessModal
> = {
  name: "Success Modal",
  argTypes: {
    onClose: storybookHelper
      .addDescription(
        "Defines a function to be called when clicking the close button or backdrop."
      )
      .apply({
        control: {
          disable: true,
        },
      }),
  },
  args: {
    opened: true,
  },
  render: (args) => <ContactSupportSuccessModal {...args} />,
}
