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
  description: {
    id: "module.genericViews.dataMigration.transferError.description",
  },
  closeButtonLabel: {
    id: "module.genericViews.dataMigration.transferError.closeButtonLabel",
  },
})

interface Props {
  onButtonClick?: VoidFunction
}

export const TransferErrorModal: FunctionComponent<Props> = ({
  onButtonClick,
}) => {
  const title = intl.formatMessage(messages.title)
  const description = intl.formatMessage(messages.description)

  return (
    <ErrorModal
      modalIcon={IconType.Failure}
      title={title}
      description={description}
      buttonLabel={intl.formatMessage(messages.closeButtonLabel)}
      onButtonClick={onButtonClick}
    />
  )
}
