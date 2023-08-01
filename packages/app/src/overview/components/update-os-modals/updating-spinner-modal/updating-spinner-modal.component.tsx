/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UpdatingSpinnerModalProps } from "App/overview/components/update-os-modals/updating-spinner-modal/updating-spinner-modal.interface"
import { UpdateProgressText } from "App/overview/components/update-os-modals/updating-spinner-modal/updating-spinner-modal.styled"
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
  updatingReleaseInfo: {
    id: "module.overview.updatingReleaseInfo",
  },
})

export const UpdatingSpinnerModal: FunctionComponent<
  UpdatingSpinnerModalProps
> = ({ open, testId, progressParams, ...rest }) => {
  return (
    <LoaderModal
      testId={testId}
      open={open}
      title={intl.formatMessage(messages.muditaOsUpdateTitle)}
      subtitle={intl.formatMessage(messages.updatingProgressTitle)}
      body={intl.formatMessage(messages.updatingProgressDescription)}
      {...rest}
    >
      {progressParams && (
        <UpdateProgressText
          processText={intl.formatMessage(messages.updatingReleaseInfo, {
            value: progressParams.currentlyUpdatingReleaseVersion,
          })}
          currentIndex={progressParams.currentlyUpdatingReleaseOrder}
          totalSize={progressParams.updatedReleasesSize}
        />
      )}
    </LoaderModal>
  )
}
