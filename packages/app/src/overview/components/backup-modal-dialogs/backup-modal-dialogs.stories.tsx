/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import {
  BackupFailureModal,
  BackupModal,
  BackupSpinnerModal,
  BackupSuccessModal,
} from "App/overview/components/backup-modal-dialogs/backup-modal-dialogs"
import { action } from "@storybook/addon-actions"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const BackupModalStory = () => {
  return (
    <Story transparentMode>
      <BackupModal
        open
        closeModal={action("Close Backup Modal")}
        onCloseButton={action("Cancel Backup Action")}
        onActionButtonClick={action("Create Backup Action")}
      />
    </Story>
  )
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const BackupSpinnerModalStory = () => {
  return (
    <Story transparentMode>
      <BackupSpinnerModal open />
    </Story>
  )
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const BackupFailureModalStory = () => {
  return (
    <Story transparentMode>
      <BackupFailureModal
        open
        closeModal={action("Close Failure Backup Modal")}
        secondaryActionButtonClick={action("Go to Support Action")}
      />
    </Story>
  )
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const BackupSuccessModalStory = () => {
  return (
    <Story transparentMode>
      <BackupSuccessModal
        open
        description={"C:/Mudita OS"}
        closeModal={action("Close Success Backup Modal")}
        onActionButtonClick={action("click done Success Backup Button")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Backup Modal Dialogs",
  component: BackupModalStory,
} as Meta
