/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Meta } from "@storybook/react"
import { styled } from "storybook/theming"
import { StoryObj } from "@storybook/react-vite"
import { action } from "storybook/actions"
import { ManageFilesDeleteConfirmModal } from "./manage-files-delete-flow/manage-files-delete-confirm-modal"

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

const meta: Meta = {
  title: "Devices/Manage Files",
  decorators: [
    (Story) => (
      <Decorator className={"story-decorator"}>
        <Story />
      </Decorator>
    ),
  ],
}

export default meta

export const Default: StoryObj<typeof ManageFilesDeleteConfirmModal> = {
  name: "Confirm delete modal",
  args: {
    opened: true,
    onCancel: action("onCancel"),
    onConfirm: action("onConfirm"),
    onClose: action("onClose"),
    fileCount: 1,
  },
  render: (args) => <ManageFilesDeleteConfirmModal {...args} />,
}
