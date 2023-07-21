/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import AppUpdateStepModal from "App/__deprecated__/renderer/wrappers/app-update-step-modal/app-update-step-modal.component"
import { AppForcedUpdateFlowTestIds } from "App/settings/components/app-forced-update-flow/app-forced-update-flow-test-ids.enum"
import { ModalLayers } from "App/modals-manager/constants/modal-layers.enum"

interface Props {
  appCurrentVersion?: string
  appLatestVersion?: string
  hideModals: () => void
}

export const AppForcedUpdateFlow: FunctionComponent<Props> = ({
  appCurrentVersion,
  appLatestVersion,
  hideModals,
}) => {
  return (
    <AppUpdateStepModal
      forced
      layer={ModalLayers.layerUpdateApp}
      appCurrentVersion={appCurrentVersion}
      appLatestVersion={appLatestVersion}
      closeModal={hideModals}
      testId={AppForcedUpdateFlowTestIds.Container}
    />
  )
}
