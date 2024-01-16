/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import MuditaCenterOnSudoModeModal from "Core/settings/components/usb-access/mudita-center-on-sudo-mode.modal"
import { useDispatch } from "react-redux"
import { hideModals } from "Core/modals-manager/actions/base.action"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"

const MuditaCenterOnSudoModeContainer = () => {
  const dispatch = useDispatch()

  return (
    <MuditaCenterOnSudoModeModal
      testId="mudita-center-on-sudo-mode-modal"
      title="Mudita Center"
      open={true}
      closeModal={() => {
        dispatch(hideModals())
      }}
      layer={ModalLayers.LinuxSudoMode}
      onActionButtonClick={() => {
        dispatch(hideModals())
      }}
      actionButtonLabel="OK"
      closeButton={false}
    />
  )
}

export default MuditaCenterOnSudoModeContainer
