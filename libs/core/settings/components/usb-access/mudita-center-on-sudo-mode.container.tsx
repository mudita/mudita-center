/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import MuditaCenterOnSudoModeModal from "Core/settings/components/usb-access/mudita-center-on-sudo-mode.modal"
import { useSelector, useDispatch } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { hideModals } from "Core/modals-manager/actions/base.action"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import { ModalsManagerState } from "Core/modals-manager"

const MuditaCenterOnSudoModeContainer = () => {
  const { appRunWithSudoShow } = useSelector(
    (state: ReduxRootState): ModalsManagerState => state.modalsManager
  )
  const dispatch = useDispatch()

  return (
    <MuditaCenterOnSudoModeModal
      testId="mudita-center-on-sudo-mode-modal"
      title="Mudita Center"
      open={appRunWithSudoShow}
      closeModal={() => {
        dispatch(hideModals())
      }}
      layer={ModalLayers.LinuxSudoMode}
      onActionButtonClick={() => {
        dispatch(hideModals())
      }}
      actionButtonLabel={"OK"}
      closeButton={false}
    />
  )
}

export default MuditaCenterOnSudoModeContainer
