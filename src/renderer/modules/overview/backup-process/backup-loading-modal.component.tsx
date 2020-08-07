import FunctionComponent from "Renderer/types/function-component.interface"
import { ModalProps } from "Renderer/components/core/modal/modal.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import theme from "Renderer/styles/theming/theme"
import { DisplayStyle } from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import React from "react"
import { noop } from "Renderer/utils/noop"
import {
  LoadingBar,
  PureBackupModal,
} from "Renderer/modules/overview/backup-process/modals.styled"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  cancel: { id: "view.generic.button.cancel" },
  title: {
    id: "view.name.overview.backup.loadingBackupModal.title",
  },
  body: {
    id: "view.name.overview.backup.loadingBackupModal.body",
  },
})

interface BackupLoadingModalProps extends Pick<ModalProps, "onClose"> {
  progress?: number
}

export const BackupLoadingModal: FunctionComponent<BackupLoadingModalProps> = ({
  onClose = noop,
  progress = 0,
}) => (
  <PureBackupModal
    closeButtonLabel={intl.formatMessage(messages.cancel)}
    closeable={false}
    onClose={onClose}
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
