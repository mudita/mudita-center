/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Meta } from "@storybook/react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { action } from "@storybook/addon-actions"
import { NotEnoughSpaceModal } from "App/overview/components/update-os-modals/not-enough-space-modal/not-enough-space-modal.component"
import { OnboardingNotCompleteModal } from "App/overview/components/onboarding-not-complete-modal/onboarding-not-complete-modal.component"

export const OnboardingNotCompleteModalStory: FunctionComponent = () => {
  return (
    <Story transparentMode>
      <OnboardingNotCompleteModal
        open
        onClose={action("Close Onboarding Not Complete Modal")}
      />
    </Story>
  )
}

export default {
  title: "Views|Overview/Update OS - Onboarding Not Complete Modal",
  component: OnboardingNotCompleteModalStory,
} as Meta
