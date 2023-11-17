/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import MuditaCenterOnSudoModeModal from "App/settings/components/usb-access/mudita-center-on-sudo-mode.modal"
import { useSelector, useDispatch } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { hideModals } from "App/modals-manager/actions/base.action"
import { ModalLayers } from "App/modals-manager/constants/modal-layers.enum"

const MuditaCenterOnSudoModeContainer = () => {
  const { appRunWithSudoShow } = useSelector(
    (state: ReduxRootState) => state.modalsManager
  )
  const dispatch = useDispatch()

  return (
    <MuditaCenterOnSudoModeModal
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
