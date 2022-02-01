/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React, { ComponentProps } from "react"
import { PureBackupModal } from "App/overview/components/backup-restore-deprecated/backup-process/modals.styled"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  title: {
    id: "module.overview.backup.failedBackupModalTitle",
  },
  body: {
    id: "module.overview.backupFailedBackupModalBody",
  },
})

export const BackupFailedModal: FunctionComponent<
  ComponentProps<typeof PureBackupModal>
> = ({ ...props }) => (
  <PureBackupModal {...props}>
    <Text
      message={messages.title}
      displayStyle={TextDisplayStyle.QuaternaryHeading}
    />
    <Text message={messages.body} displayStyle={TextDisplayStyle.Paragraph4} />
  </PureBackupModal>
)
