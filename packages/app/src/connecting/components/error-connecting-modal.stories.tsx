/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import ErrorConnectingModal from "App/connecting/components/error-connecting-modal"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ErrorConnectingModalStory = () => {
  return (
    <Story transparentMode>
      <ErrorConnectingModal
        open
        closeModal={action("Close Backup Modal")}
        onCloseButton={action("Cancel Backup Action")}
      />
    </Story>
  )
}

export default {
  title: "Views|Connecting/Backup Modal Dialogs",
  component: ErrorConnectingModalStory,
} as Meta
