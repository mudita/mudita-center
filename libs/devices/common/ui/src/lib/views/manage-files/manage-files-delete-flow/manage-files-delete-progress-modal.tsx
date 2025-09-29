/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Modal } from "app-theme/ui"
import { IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "harmony.manageFiles.deleting.modal.title",
  },
})

interface Props {
  opened: boolean
}

export const ManageFilesDeleteProgressModal: FunctionComponent<Props> = ({
  opened,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Spinner} />
      <Modal.Title text={formatMessage(messages.title)} />
    </Modal>
  )
}
