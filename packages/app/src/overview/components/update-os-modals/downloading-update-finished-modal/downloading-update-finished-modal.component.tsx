/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DownloadingUpdateFinishedModalProps } from "App/overview/components/update-os-modals/downloading-update-finished-modal/downloading-update-finished-modal.interface"
import { ModalText } from "App/overview/components/update-os-modals/downloading-update-finished-modal/downloading-update-finished-modal.styled"
import { OSUpdateModal } from "App/overview/components/update-os-modals/os-update-modal"
import { ModalMainText, RoundIconWrapper } from "App/ui/components/modal-dialog"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  downloadCompletedMessage: {
    id: "module.overview.downloadCompletedMessage",
  },
  downloadCompletedDescription: {
    id: "module.overview.downloadCompletedDescription",
  },
  downloadCompletedButton: {
    id: "module.overview.downloadCompletedButton",
  },
  downloadCompletedCloseButton: {
    id: "module.overview.downloadCompletedCloseButton",
  },
})

export const DownloadingUpdateFinishedModal: FunctionComponent<DownloadingUpdateFinishedModalProps> =
  ({ onOsUpdate, open, onClose, testId, downloadedReleases }) => {
    const formattedVersionsText = downloadedReleases
      .map((release) => `MuditaOS v${release.version}`)
      .join(" / ")

    return (
      <OSUpdateModal
        testId={testId}
        open={open}
        closeButton
        closeable
        closeModal={onClose}
        onActionButtonClick={onOsUpdate}
        actionButtonLabel={intl.formatMessage(messages.downloadCompletedButton)}
        closeButtonLabel={intl.formatMessage(
          messages.downloadCompletedCloseButton
        )}
      >
        <RoundIconWrapper>
          <Icon type={IconType.Pure} width={3.2} />
        </RoundIconWrapper>
        <ModalMainText
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.downloadCompletedMessage}
        />
        <ModalText
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={{
            ...messages.downloadCompletedDescription,
            values: {
              versionsAmount: formattedVersionsText.length,
              data: formattedVersionsText,
              ...textFormatters,
            },
          }}
        />
      </OSUpdateModal>
    )
  }
