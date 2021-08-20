/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import theme from "Renderer/styles/theming/theme"
import { DisplayStyle } from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import React, { ComponentProps } from "react"
import { noop } from "Renderer/utils/noop"
import {
  LoadingBar,
  PureBackupModal,
} from "App/overview/components/backup-process/modals.styled"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  cancel: { id: "component.cancelButton" },
  title: {
    id: "module.overview.backupLoadingBackupModalTitle",
  },
  body: {
    id: "module.overview.backupLoadingBackupModalBody",
  },
})

interface BackupLoadingModalProps {
  progress?: number
  open: boolean
}

export const BackupLoadingModal: FunctionComponent<
  BackupLoadingModalProps & ComponentProps<typeof PureBackupModal>
> = ({ onClose = noop, progress = 0, ...props }) => (
  <PureBackupModal
    closeButtonLabel={intl.formatMessage(messages.cancel)}
    closeable={false}
    {...props}
  >
    <Text
      message={messages.title}
      displayStyle={TextDisplayStyle.LargeBoldText}
    />
    <Text
      message={messages.body}
      displayStyle={TextDisplayStyle.MediumFadedLightText}
    />
    <LoadingBar
      chartData={[
        { value: progress, color: backgroundColor("chartBar")({ theme }) },
        {
          value: 100 - progress,
          color: backgroundColor("minor")({ theme }),
        },
      ]}
      displayStyle={DisplayStyle.Thin}
    />
  </PureBackupModal>
)
