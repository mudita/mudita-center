/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import type { Meta, StoryObj } from "@storybook/react"
import { storybookHelper } from "app-theme/utils"
import { Modal } from "app-theme/ui"
import { UpdateCheckingModal } from "./update-checking-modal"
import { UpdateNotAvailableModal } from "./update-not-available-modal"
import { UpdateAvailableModal } from "./update-available-modal"
import { UpdateInProgressModal } from "./update-in-progress-modal"
import { UpdateErrorModal } from "./update-error-modal"

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
  title: "App/Update",
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

export const Default: StoryObj<typeof UpdateCheckingModal> = {
  name: "Update checking modal",
  argTypes: {
    // @ts-expect-error unknown properties
    layer: storybookHelper.disableControl().apply(),
    size: storybookHelper.disableControl().apply(),
    customStyles: storybookHelper.disableControl().apply(),
  },
  args: {
    opened: true,
  },
  render: (args) => <UpdateCheckingModal {...args} />,
}

export const UpdateNotAvailable: StoryObj<typeof UpdateNotAvailableModal> = {
  name: "Update not available modal",
  argTypes: Default.argTypes,
  args: {
    opened: true,
  },
  render: (args) => <UpdateNotAvailableModal {...args} />,
}

export const UpdateAvailable: StoryObj<typeof UpdateAvailableModal> = {
  name: "Update available modal",
  argTypes: Default.argTypes,
  args: {
    opened: true,
    version: "3.0.1",
  },
  render: (args) => <UpdateAvailableModal {...args} />,
}

export const UpdateInProgress: StoryObj<typeof UpdateInProgressModal> = {
  name: "Update in progress modal",
  argTypes: Default.argTypes,
  args: {
    opened: true,
  },
  render: (args) => <UpdateInProgressModal {...args} />,
}

export const UpdateError: StoryObj<typeof UpdateErrorModal> = {
  name: "Update error modal",
  argTypes: Default.argTypes,
  args: {
    opened: true,
  },
  render: (args) => <UpdateErrorModal {...args} />,
}
