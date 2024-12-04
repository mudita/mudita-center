/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { IconType } from "generic-view/utils"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { ErrorModal } from "./error-modal"
import { TransferFailMessage } from "./transfer-fail-message"

const messages = defineMessages({
  title: {
    id: "module.genericViews.dataMigration.failure.title",
  },
  closeButtonLabel: {
    id: "module.genericViews.dataMigration.failure.closeButtonLabel",
  },
})

interface Props {
  onButtonClick?: VoidFunction
  partialChanges?: boolean
}

export const TransferErrorModal: FunctionComponent<Props> = ({
  onButtonClick,
  partialChanges,
}) => {
  const title = intl.formatMessage(messages.title)
  const buttonLabel = intl.formatMessage(messages.closeButtonLabel)

  return (
    <ErrorModal
      modalIcon={IconType.Failure}
      title={title}
      description={<TransferFailMessage partialChanges={partialChanges} />}
      buttonLabel={buttonLabel}
      onButtonClick={onButtonClick}
    />
  )
}
