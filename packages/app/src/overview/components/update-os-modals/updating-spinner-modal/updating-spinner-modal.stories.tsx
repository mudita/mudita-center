/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { UpdatingSpinnerModal } from "App/overview/components/update-os-modals/updating-spinner-modal/updating-spinner-modal.component"

export const UpdatingSpinnerModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <UpdatingSpinnerModal
        open
        progressParams={{
          currentlyUpdatingReleaseOrder: 1,
          currentlyUpdatingReleaseVersion: "1.0.0",
          updatedReleasesSize: 3,
        }}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Updating Spinner Modal",
  component: UpdatingSpinnerModalStory,
} as Meta
