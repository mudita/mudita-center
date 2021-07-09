/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, useEffect, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import {
  UpdatingForceModal,
  UpdatingSpinnerModal,
} from "Renderer/modules/overview/overview.modal-dialogs"

export enum UpdatingForceModalFlowState {
  Info = "Info",
  Updating = "updating",
  Success = "success",
  Fail = "fail",
}

interface Props extends ComponentProps<typeof ModalDialog> {}

const UpdatingForceModalFlow: FunctionComponent<Props> = ({ open }) => {
  const [
    updatingForceOpenState,
    setUpdatingForceOpenState,
  ] = useState<UpdatingForceModalFlowState>()

  useEffect(() => {
    if (open) {
      setUpdatingForceOpenState(UpdatingForceModalFlowState.Info)
    } else {
      setUpdatingForceOpenState(undefined)
    }
  }, [open])

  const runUpdateProcess = () => {
    setUpdatingForceOpenState(UpdatingForceModalFlowState.Updating)
  }
  return (
    <>
      <UpdatingForceModal
        open={updatingForceOpenState === UpdatingForceModalFlowState.Info}
        onActionButtonClick={runUpdateProcess}
      />
      <UpdatingSpinnerModal
        open={updatingForceOpenState === UpdatingForceModalFlowState.Updating}
      />
    </>
  )
}

export default UpdatingForceModalFlow
