/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Meta } from "@storybook/react"
import Story from "Renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { BackupSetSecretKeyModal } from "App/overview/components/backup-set-secret-key-modal-dialog/backup-set-secret-key-modal-dialog.component"

export const BackupSetSecretKeyModalStory = () => {
  return (
    <Story transparentMode>
      <BackupSetSecretKeyModal
        open
        closeModal={action("Close Set Secret Key Backup Modal")}
        onSecretKeySet={action("Set secret key trigger")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Backup Set Password Modal Dialog",
  component: BackupSetSecretKeyModalStory,
} as Meta
