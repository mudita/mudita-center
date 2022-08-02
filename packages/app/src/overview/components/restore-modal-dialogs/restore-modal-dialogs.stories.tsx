/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import {
  RestoreFailureModal,
  RestoreModal,
  RestoreSpinnerModal,
  RestoreSuccessModal,
} from "App/overview/components/restore-modal-dialogs/restore-modal-dialogs"
import { action } from "@storybook/addon-actions"
import RestoreAvailableBackupModal from "App/overview/components/restore-modal-dialogs/restore-available-backup-modal"
import { Backup } from "App/backup/reducers"

const backups: Backup[] = [
  {
    filePath: "C:\\backups\\backup-1.text",
    date: new Date(),
  },
]

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const RestoreAvailableBackupModalStory = () => {
  return (
    <Story transparentMode>
      <RestoreAvailableBackupModal
        open
        backups={backups}
        closeModal={action("Close Restore Available Backup Modal Modal")}
        onBackupRowClick={action("Click Backup Row")}
      />
    </Story>
  )
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const RestoreSpinnerModalStory = () => {
  return (
    <Story transparentMode>
      <RestoreSpinnerModal open />
    </Story>
  )
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
  component: RestoreAvailableBackupModalStory,
} as Meta
