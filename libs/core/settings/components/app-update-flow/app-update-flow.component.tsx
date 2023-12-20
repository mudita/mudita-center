/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import AppUpdateStepModal from "Core/__deprecated__/renderer/wrappers/app-update-step-modal/app-update-step-modal.component"
import { AppUpdateFlowTestIds } from "Core/settings/components/app-update-flow/app-update-flow-test-ids.enum"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import { settingsStateSelector } from "Core/settings/selectors"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { skipAvailableUpdate } from "Core/settings/actions/skip-available-update.action"

export const AppUpdateFlow: FunctionComponent = () => {
  const dispatch = useDispatch<Dispatch>()
  const { latestVersion, currentVersion, updateRequired } = useSelector(
    settingsStateSelector
  )

  const handleCloseModal = () => {
    dispatch(skipAvailableUpdate())
  }

  return (
    <AppUpdateStepModal
      forced={updateRequired}
      layer={ModalLayers.UpdateApp}
      appCurrentVersion={currentVersion}
      appLatestVersion={latestVersion}
      closeModal={handleCloseModal}
      testId={AppUpdateFlowTestIds.Container}
    />
  )
}
