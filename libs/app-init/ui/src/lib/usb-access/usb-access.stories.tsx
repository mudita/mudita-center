/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import type { Meta, StoryObj } from "@storybook/react"
import { storybookHelper } from "app-theme/utils"
import { Modal } from "app-theme/ui"
import { UsbAccessRequestModal } from "./usb-access-request-modal"
import { ContactSupportErrorModal } from "contact-support/ui"
import { UsbAccessGrantedModal } from "./usb-access-granted-modal"

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
  title: "App/Initialize/USB Access",
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

export const Default: StoryObj<typeof UsbAccessRequestModal> = {
  name: "Request Modal",
  args: {
    opened: true,
  },
  argTypes: {
    onClose: storybookHelper
      .addDescription(
        "Defines a function to be called when clicking the close button."
      )
      .apply({
        control: {
          disable: true,
        },
      }),
    onAction: storybookHelper
      .addDescription(
        "Defines a function to be called when clicking the action button."
      )
      .apply({
        control: {
          disable: true,
        },
      }),
  },
  render: (args) => <UsbAccessRequestModal {...args} />,
}

export const UsbAccessGranted: StoryObj<typeof UsbAccessGrantedModal> = {
  name: "Granted Modal",
  args: {
    opened: true,
  },
  argTypes: {
    onClose: storybookHelper
      .addDescription(
        "Defines a function to be called when clicking the close button."
      )
      .apply({
        control: {
          disable: true,
        },
      }),
    onAction: storybookHelper
      .addDescription(
        "Defines a function to be called when clicking the action button."
      )
      .apply({
        control: {
          disable: true,
        },
      }),
  },
  render: (args) => <UsbAccessGrantedModal {...args} />,
}
