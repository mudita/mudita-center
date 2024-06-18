/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { IconType } from "generic-view/utils"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { ErrorModal } from "./error-modal"

const messages = defineMessages({
  title: {
    id: "module.genericViews.dataMigration.transferError.title",
  },
  closeButtonLabel: {
    id: "module.genericViews.dataMigration.transferError.closeButtonLabel",
  },
  connectionFailed: {
    id: "module.genericViews.dataMigration.transferError.connectionFailed",
  },
})

export const TransferErrorModal: FunctionComponent = () => {
  const title = intl.formatMessage(messages.title)
  const description = intl.formatMessage(messages.connectionFailed)

  return (
    <ErrorModal
      modalIcon={IconType.Failure}
      title={title}
      description={description}
      buttonLabel={intl.formatMessage(messages.closeButtonLabel)}
    />
  )
}
