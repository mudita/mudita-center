/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React from "react"
import { PureBackupModal } from "Renderer/modules/overview/backup-process/modals.styled"
import { defineMessages } from "react-intl"
import { Properties } from "Renderer/components/core/modal-dialog/modal-dialog.component"

const messages = defineMessages({
  title: {
    id: "view.name.overview.backup.failedRestoringBackupModal.title",
  },
  body: {
    id: "view.name.overview.backup.failedRestoringBackupModal.body",
  },
})

export const BackupRestorationFailedModal: FunctionComponent<Properties> = ({
  ...props
}) => (
  <PureBackupModal {...props}>
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
