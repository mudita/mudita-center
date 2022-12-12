/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DownloadingUpdateModalProps } from "App/overview/components/update-os-modals/downloading-update-modal/downloading-update-modal.interface"
import {
  DownloadBar,
  DownloadProgressText,
  Pergentage,
  Submessage,
} from "App/overview/components/update-os-modals/downloading-update-modal/downloading-update-modal.styled"
import { OSUpdateModal } from "App/overview/components/update-os-modals/os-update-modal"
import { ModalMainText, RoundIconWrapper } from "App/ui/components/modal-dialog"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  downloadingUpdateMessage: {
    id: "module.overview.downloadingUpdateMessage",
  },
  downloadingUpdateDownloading: {
    id: "module.overview.downloadingUpdateDownloading",
  },
  downloadingUpdateButton: {
    id: "module.overview.downloadingUpdateButton",
  },
  downloadingUpdateSubmessage: {
    id: "module.overview.downloadingUpdateSubmessage",
  },
  downloadingReleaseInfo: {
    id: "module.overview.downloadingReleaseInfo",
  },
})

export const DownloadingUpdateModal: FunctionComponent<DownloadingUpdateModalProps> =
  ({
    percent,
    open,
    onCancel,
    testId,
    currentlyDownloadingReleaseVersion,
    currentlyDownloadingReleaseOrder,
    downloadedReleasesSize,
  }) => {
    return (
      <OSUpdateModal
        testId={testId}
        open={open}
        closeButton
        closeButtonLabel={intl.formatMessage(messages.downloadingUpdateButton)}
        onCloseButton={onCancel}
      >
        <RoundIconWrapper>
          <Icon type={IconType.Download} width={3.2} />
        </RoundIconWrapper>
        <ModalMainText
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.downloadingUpdateMessage}
        />
        <Submessage
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.downloadingUpdateSubmessage}
        />
        <DownloadBar>
          <span style={{ width: `${percent}%` }} />
        </DownloadBar>
        <Pergentage displayStyle={TextDisplayStyle.Paragraph4} color="primary">
          {percent}%
        </Pergentage>
        <DownloadProgressText
          processText={intl.formatMessage(messages.downloadingReleaseInfo, {
            value: currentlyDownloadingReleaseVersion,
          })}
          currentIndex={currentlyDownloadingReleaseOrder}
          totalSize={downloadedReleasesSize}
        />
      </OSUpdateModal>
    )
  }
