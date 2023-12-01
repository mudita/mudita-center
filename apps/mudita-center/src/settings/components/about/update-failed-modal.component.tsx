/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalDialogProps } from "App/ui"

const messages = defineMessages({
  checkForFailedAppUpdateTitle: {
    id: "module.settings.checkForFailedAppUpdateTitle",
  },
  checkForFailedAppUpdateSubtitle: {
    id: "module.settings.checkForFailedAppUpdateSubtitle",
  },
  checkForFailedAppUpdateBody: {
    id: "module.settings.checkForFailedAppUpdateBody",
  },
})

interface Props extends Omit<ModalDialogProps, "close" | "open"> {
  testId?: string
  open: boolean
  closeModal: () => void
}

export const UpdateFailedModal: FunctionComponent<Props> = ({
  testId,
  open,
  closeModal,
  ...rest
}) => {
  return (
    <ErrorModal
      {...rest}
      testId={testId}
      open={open}
      closeButton
      closeable
      closeModal={closeModal}
      title={intl.formatMessage(messages.checkForFailedAppUpdateTitle)}
      subtitle={intl.formatMessage(messages.checkForFailedAppUpdateSubtitle)}
      body={intl.formatMessage(messages.checkForFailedAppUpdateBody)}
    />
  )
}
