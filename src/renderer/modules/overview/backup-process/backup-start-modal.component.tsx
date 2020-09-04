import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React from "react"
import { PureBackupModal } from "Renderer/modules/overview/backup-process/modals.styled"
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  cancel: { id: "view.generic.button.cancel" },
  title: {
    id: "view.name.overview.backup.createBackupModal.title",
  },
  body: {
    id: "view.name.overview.backup.createBackupModal.body",
  },
})

interface BackupStartModalProps {
  startBackup?: () => void
  fileSize?: string
  date?: string
}

export const BackupStartModal: FunctionComponent<BackupStartModalProps> = ({
  startBackup = noop,
  fileSize,
  date,
}) => (
  <PureBackupModal
    title={intl.formatMessage(messages.title)}
    onActionButtonClick={startBackup}
    actionButtonLabel={intl.formatMessage(messages.title)}
    closeButtonLabel={intl.formatMessage(messages.cancel)}
  >
    <Text
      message={{
        ...messages.body,
        values: {
          fileSize,
          date,
        },
      }}
      displayStyle={TextDisplayStyle.MediumFadedLightText}
    />
  </PureBackupModal>
)
