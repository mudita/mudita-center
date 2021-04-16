/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React, { ComponentProps } from "react"
import { PureBackupModal } from "Renderer/modules/overview/backup-process/modals.styled"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"

const messages = defineMessages({
  ok: { id: "component.okButton" },
  title: {
    id: "module.overview.backup.restoredBackupModal.title",
  },
  body: {
    id: "module.overview.backup.restoredBackupModal.body",
  },
})

export const BackupRestorationFinishedModal: FunctionComponent<ComponentProps<typeof PureBackupModal>> = ({
  ...props
}) => (
  <PureBackupModal
    actionButtonLabel={intl.formatMessage(messages.ok)}
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
  </PureBackupModal>
)
