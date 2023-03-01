/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { UpdatingFailureWithHelpModal } from "App/overview/components/update-os-modals/updating-failure-with-help-modal/updating-failure-with-help-modal.component"

export const UpdatingFailureWithHelpModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <UpdatingFailureWithHelpModal
        open
        onContact={action("Go contact Updating Failure With Help Modal")}
        onHelp={action("Go help Updating Failure With Help Modal")}
        onClose={action("Close Updating Failure With Help Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Updating Failure With Help Modal",
  component: UpdatingFailureWithHelpModalStory,
} as Meta
