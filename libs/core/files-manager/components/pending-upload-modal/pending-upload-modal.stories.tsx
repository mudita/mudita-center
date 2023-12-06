/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Meta } from "@storybook/react"
import Story from "Core/__deprecated__/renderer/components/storybook/story.component"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import PendingUploadModal from "Core/files-manager/components/pending-upload-modal/pending-upload-modal.component"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PendingUploadModalStory = () => {
  return (
    <Story transparentMode>
      <PendingUploadModal filesCount={100} onClose={noop} onOk={noop} />
    </Story>
  )
}

export default {
  title: "Views|Files Manager/Pending Upload Modal Dialogs",
  component: PendingUploadModalStory,
} as Meta
