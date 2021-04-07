/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React from "react"
import {
  LoadingBar,
  PureBackupModal,
} from "Renderer/modules/overview/backup-process/modals.styled"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import theme from "Renderer/styles/theming/theme"
import { DisplayStyle } from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { Properties } from "Renderer/components/core/modal-dialog/modal-dialog.component"

const messages = defineMessages({
  cancel: { id: "view.generic.button.cancel" },
  title: {
    id: "view.name.overview.backup.restoringBackupModal.title",
  },
  body: {
    id: "view.name.overview.backup.loadingBackupModal.body",
  },
})

interface BackupRestorationLoadingModalProps extends Properties {
  progress?: number
}

export const BackupRestorationLoadingModal: FunctionComponent<BackupRestorationLoadingModalProps> = ({
  progress = 0,
  ...props
}) => (
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
