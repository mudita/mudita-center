/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UpdatingSpinnerModalProps } from "App/overview/components/modals/updating-spinner-modal/updating-spinner-modal.interface"
import LoaderModal from "App/ui/components/loader-modal/loader-modal.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  updatingProgressTitle: {
    id: "module.overview.updatingProgressTitle",
  },
  updatingProgressDescription: {
    id: "module.overview.updatingProgressDescription",
  },
})

export const UpdatingSpinnerModal: FunctionComponent<
  UpdatingSpinnerModalProps
> = ({ open }) => {
  return (
    <LoaderModal
      open={open}
      title={intl.formatMessage(messages.muditaOsUpdateTitle)}
      subtitle={intl.formatMessage(messages.updatingProgressTitle)}
      body={intl.formatMessage(messages.updatingProgressDescription)}
    />
  )
}
