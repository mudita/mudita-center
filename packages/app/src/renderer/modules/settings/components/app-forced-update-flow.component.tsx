/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import AppUpdateStepModal from "Renderer/wrappers/app-update-step-modal/app-update-step-modal.component"

interface Props {
  appForcedUpdateFlowShow: boolean
  appCurrentVersion?: string
  appLatestVersion?: string
  hideModals: () => void
}

const AppForcedUpdateFlow: FunctionComponent<Props> = ({
  appForcedUpdateFlowShow,
  appCurrentVersion,
  appLatestVersion,
  hideModals,
}) => {
  const closeModal = () => hideModals
  return (
    <>
      {appForcedUpdateFlowShow && (
        <AppUpdateStepModal
          forced
          appCurrentVersion={appCurrentVersion}
          appLatestVersion={appLatestVersion}
          closeModal={closeModal}
        />
      )}
    </>
  )
}

export default AppForcedUpdateFlow
