/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { IconType } from "app-theme/models"
import { formatMessage, Messages } from "app-localize/utils"
import { Modal } from "app-theme/ui"

interface Props {
  opened: boolean
  fileCount: number
  messages: {
    transferringModalTitle: Messages
  }
}

export const ManageFilesTransferringModal: FunctionComponent<Props> = ({
  opened,
  fileCount,
  messages,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Spinner} />
      <Modal.Title
        text={formatMessage(messages.transferringModalTitle, { fileCount })}
      />
    </Modal>
  )
}
