/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { AnalyticsEventCategory } from "app-utils/models"
import { AppActions, useUniqueTrack } from "app-utils/renderer"
import { AppSettings } from "app-settings/renderer"
import { PrivacyPolicyModal } from "app-init/ui"
import { RequirementStatus } from "./requirement-status.type"

export const PrivacyPolicyFlow: FunctionComponent<{
  status: RequirementStatus
  onAccept: VoidFunction
}> = ({ status, onAccept }) => {
  const uniqueTrack = useUniqueTrack()

  const acceptPrivacyPolicy = async () => {
    await AppSettings.set({
      user: {
        privacyPolicyAccepted: true,
      },
    })
    void uniqueTrack({
      e_c: AnalyticsEventCategory.CenterVersion,
      e_a: import.meta.env.VITE_APP_VERSION,
    })
    onAccept()
  }

  const closePrivacyPolicy = () => {
    AppActions.close()
  }

  return (
    <PrivacyPolicyModal
      opened={status === RequirementStatus.ActionRequired}
      onAccept={acceptPrivacyPolicy}
      onClose={closePrivacyPolicy}
    />
  )
}
