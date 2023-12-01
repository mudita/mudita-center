/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import ErrorUpdateModal from "App/connecting/components/error-update-modal/error-update-modal"
import { noop } from "App/__deprecated__/renderer/utils/noop"

export const ErrorUpdateModalStory = (): JSX.Element => {
  return (
    <Story transparentMode>
      <ErrorUpdateModal open closeModal={noop} />
    </Story>
  )
}

export default {
  title: "Views|Connecting/Backup Modal Dialogs",
  component: ErrorUpdateModalStory,
} as Meta
