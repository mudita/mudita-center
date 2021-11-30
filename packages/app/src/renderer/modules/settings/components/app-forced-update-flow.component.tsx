/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import AppUpdateStepModal from "Renderer/wrappers/app-update-step-modal/app-update-step-modal.component"
import { AppForcedUpdateFlowTestIds } from "Renderer/modules/settings/components/app-forced-update-flow-test-ids.enum"

interface Props {
  appCurrentVersion?: string
  appLatestVersion?: string
  hideModals: () => void
}

const AppForcedUpdateFlow: FunctionComponent<Props> = ({
  appCurrentVersion,
  appLatestVersion,
  hideModals,
}) => {
  return (
    <AppUpdateStepModal
      forced
      appCurrentVersion={appCurrentVersion}
      appLatestVersion={appLatestVersion}
      closeModal={hideModals}
      testId={AppForcedUpdateFlowTestIds.Container}
    />
  )
}

export default AppForcedUpdateFlow
