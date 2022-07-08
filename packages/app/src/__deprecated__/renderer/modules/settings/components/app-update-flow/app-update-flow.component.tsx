/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import AppUpdateStepModal from "App/__deprecated__/renderer/wrappers/app-update-step-modal/app-update-step-modal.component"
import { AppUpdateFlowTestIds } from "App/__deprecated__/renderer/modules/settings/components/app-update-flow/app-update-flow-test-ids.enum"

interface Props {
  appCurrentVersion?: string
  appLatestVersion?: string
  closeModal: () => void
}

const AppUpdateFlow: FunctionComponent<Props> = ({
  appCurrentVersion,
  appLatestVersion,
  closeModal,
}) => {
  return (
    <AppUpdateStepModal
      forced
      appCurrentVersion={appCurrentVersion}
      appLatestVersion={appLatestVersion}
      closeModal={closeModal}
      testId={AppUpdateFlowTestIds.Container}
    />
  )
}

export default AppUpdateFlow
