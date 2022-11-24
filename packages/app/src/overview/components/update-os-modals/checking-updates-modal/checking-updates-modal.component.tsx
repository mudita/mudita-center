/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CheckingUpdatesModalProps } from "App/overview/components/update-os-modals/checking-updates-modal/checking-updates-modal.interface"
import LoaderModal from "App/ui/components/loader-modal/loader-modal.component"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React, { FunctionComponent } from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  checkingForUpdatesMessage: {
    id: "module.overview.checkingForUpdatesMessage",
  },
})

export const CheckingUpdatesModal: FunctionComponent<
  CheckingUpdatesModalProps
> = ({ open, testId }) => {
  return (
    <LoaderModal
      testId={testId}
      open={open}
      title={intl.formatMessage(messages.muditaOsUpdateTitle)}
      subtitle={intl.formatMessage(messages.checkingForUpdatesMessage)}
    />
  )
}
