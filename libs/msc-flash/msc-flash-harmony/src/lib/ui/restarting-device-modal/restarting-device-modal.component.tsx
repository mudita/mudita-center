/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { defineMessages } from "react-intl"
import { useDispatch } from "react-redux"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import LoaderModal from "Core/ui/components/loader-modal/loader-modal.component"
import { setFlashingProcessState } from "../../actions"
import { FlashingProcessState } from "../../constants"

interface RestartingDeviceModalProps {
  open: boolean
}

const messages = defineMessages({
  restartingDeviceModalTitle: {
    id: "module.recoveryMode.harmony.title",
  },
  restartingDeviceModalSubitle: {
    id: "module.recoveryMode.modal.restarting.subtitle",
  },
  restartingDeviceModalMessage: {
    id: "module.recoveryMode.modal.restarting.message",
  },
})

export const RestartingDeviceModal: FunctionComponent<
  RestartingDeviceModalProps
> = ({ open }) => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (open) {
      timeoutId = setTimeout(() => {
        dispatch(setFlashingProcessState(FlashingProcessState.Failed))
      }, 2 * 60 * 1000)
    }

    return () => clearTimeout(timeoutId)
  }, [dispatch, open])

  return (
    <LoaderModal
      open={open}
      title={intl.formatMessage(messages.restartingDeviceModalTitle)}
      subtitle={intl.formatMessage(messages.restartingDeviceModalSubitle)}
      body={intl.formatMessage(messages.restartingDeviceModalMessage)}
    ></LoaderModal>
  )
}
