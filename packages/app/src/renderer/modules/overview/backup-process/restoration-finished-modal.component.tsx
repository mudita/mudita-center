import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React from "react"
import { PureBackupModal } from "Renderer/modules/overview/backup-process/modals.styled"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"

const messages = defineMessages({
  ok: { id: "view.generic.button.ok" },
  title: {
    id: "view.name.overview.backup.restoredBackupModal.title",
  },
  body: {
    id: "view.name.overview.backup.restoredBackupModal.body",
  },
})

export const BackupRestorationFinishedModal: FunctionComponent = () => (
  <PureBackupModal actionButtonLabel={intl.formatMessage(messages.ok)}>
    <Text
      message={messages.title}
      displayStyle={TextDisplayStyle.LargeBoldText}
    />
    <Text
      message={messages.body}
      displayStyle={TextDisplayStyle.MediumFadedLightText}
    />
  </PureBackupModal>
)
