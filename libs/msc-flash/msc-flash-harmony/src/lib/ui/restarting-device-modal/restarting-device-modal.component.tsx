/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"
import LoaderModal from "Core/ui/components/loader-modal/loader-modal.component"

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
  return (
    <LoaderModal
      open={open}
      title={intl.formatMessage(messages.restartingDeviceModalTitle)}
      subtitle={intl.formatMessage(messages.restartingDeviceModalSubitle)}
      body={intl.formatMessage(messages.restartingDeviceModalMessage)}
    ></LoaderModal>
  )
}
