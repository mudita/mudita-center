import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React from "react"
import { PureBackupModal } from "Renderer/modules/overview/backup-process/modals.styled"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  title: {
    id: "view.name.overview.backup.failedRestoringBackupModal.title",
  },
  body: {
    id: "view.name.overview.backup.failedRestoringBackupModal.body",
  },
})

export const BackupRestorationFailedModal: FunctionComponent = () => (
  <PureBackupModal>
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
