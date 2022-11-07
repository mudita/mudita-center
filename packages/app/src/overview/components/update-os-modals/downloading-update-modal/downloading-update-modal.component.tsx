/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DownloadingUpdateModalProps } from "App/overview/components/update-os-modals/downloading-update-modal/downloading-update-modal.interface"
import { DownloadBar } from "App/overview/components/update-os-modals/downloading-update-modal/downloading-update-modal.styled"
import { OSUpdateModal } from "App/overview/components/update-os-modals/os-update-modal"
import { ModalMainText, RoundIconWrapper } from "App/ui/components/modal-dialog"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { convertBytes } from "App/__deprecated__/renderer/utils/convert-bytes"
import formatDuration from "App/__deprecated__/renderer/utils/format-duration"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages, FormattedMessage } from "react-intl"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  downloadingUpdateMessage: {
    id: "module.overview.downloadingUpdateMessage",
  },
  downloadingUpdateDescriptionStarting: {
    id: "module.overview.downloadingUpdateStarting",
  },
  downloadingUpdateDescriptionDownloading: {
    id: "module.overview.downloadingUpdateDownloading",
  },
  downloadingUpdateDescriptionFinishing: {
    id: "module.overview.downloadingUpdateFinishing",
  },
  downloadingUpdateButton: {
    id: "module.overview.downloadingUpdateButton",
  },
})

export const DownloadingUpdateModal: FunctionComponent<
  DownloadingUpdateModalProps
> = ({ percent, speed, timeLeft, open, onCancel }) => {
  const starting = (
    <FormattedMessage {...messages.downloadingUpdateDescriptionStarting} />
  )
  const downloading = (
    <FormattedMessage
      {...messages.downloadingUpdateDescriptionDownloading}
      values={{
        speed: convertBytes(speed) + "/s",
        timeLeft: formatDuration(timeLeft || 0),
      }}
    />
  )
  const finishing = (
    <FormattedMessage {...messages.downloadingUpdateDescriptionFinishing} />
  )
  return (
    <OSUpdateModal
      open={open}
      closeable={false}
      closeButton={false}
      actionButtonLabel={intl.formatMessage(messages.downloadingUpdateButton)}
      onActionButtonClick={onCancel}
    >
      <RoundIconWrapper>
        <Icon type={IconType.Download} width={3.2} />
      </RoundIconWrapper>
      <ModalMainText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.downloadingUpdateMessage}
      />
      <Text displayStyle={TextDisplayStyle.Paragraph4} color="secondary">
        {timeLeft === undefined
          ? starting
          : timeLeft < 1
          ? finishing
          : downloading}
      </Text>
      <DownloadBar>
        <span style={{ width: `${percent}%` }} />
      </DownloadBar>
    </OSUpdateModal>
  )
}
