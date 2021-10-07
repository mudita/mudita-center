/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Meta } from "@storybook/react"
import Story from "Renderer/components/storybook/story.component"
import {
  RestoreFailureModal,
  RestoreModal,
  RestoreSpinnerModal,
  RestoreSuccessModal,
} from "App/overview/components/restore-modal-dialogs/restore-modal-dialogs"
import { action } from "@storybook/addon-actions"

export const RestoreModalStory = () => {
  return (
    <Story transparentMode>
      <RestoreModal
        open
        backupDate={new Date()}
        closeModal={action("Close Restore Modal")}
        onCloseButton={action("Cancel Restore Action")}
        onActionButtonClick={action("Create Restore Action")}
      />
    </Story>
  )
}

export const RestoreSpinnerModalStory = () => {
  return (
    <Story transparentMode>
      <RestoreSpinnerModal open />
    </Story>
  )
}

export const RestoreFailureModalStory = () => {
  return (
    <Story transparentMode>
      <RestoreFailureModal
        open
        closeModal={action("Close Failure Restore Modal")}
        secondaryActionButtonClick={action("Go to Support Action")}
      />
    </Story>
  )
}

export const RestoreSuccessModalStory = () => {
  return (
    <Story transparentMode>
      <RestoreSuccessModal
        open
        closeModal={action("Close Success Restore Modal")}
        onActionButtonClick={action("click done Success Restore Button")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Restore Modal Dialogs",
  component: RestoreModalStory,
} as Meta
