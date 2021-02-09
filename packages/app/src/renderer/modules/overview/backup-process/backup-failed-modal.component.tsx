/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React from "react"
import { PureBackupModal } from "Renderer/modules/overview/backup-process/modals.styled"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  title: {
    id: "view.name.overview.backup.failedBackupModal.title",
  },
  body: {
    id: "view.name.overview.backup.failedBackupModal.body",
  },
})

export const BackupFailedModal: FunctionComponent = () => (
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
