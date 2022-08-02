/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { RestoreConfirmSecretKeyModal } from "App/overview/components/restore-confirm-secret-key-modal-dialog/restore-confirm-secret-key-modal-dialog.component"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const RestoreConfirmSecretKeyModalStory = () => {
  return (
    <Story transparentMode>
      <RestoreConfirmSecretKeyModal
        open
        closeModal={action("Close Confirm Secret Key Restore Modal")}
        onSecretKeySet={action("Set secret key trigger")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Restore Confirm Secret Key Modal Dialog",
  component: RestoreConfirmSecretKeyModalStory,
} as Meta
