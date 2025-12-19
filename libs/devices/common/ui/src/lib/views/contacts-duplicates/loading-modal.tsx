/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Modal } from "app-theme/ui"
import { defineMessages } from "app-localize/utils"
import { IconType } from "app-theme/models"

const messages = defineMessages({
  title: {
    id: "apiDevice.contacts.duplicates.mergingModal.title",
  },
})

interface Props {
  opened: boolean
}

export const LoadingModal: FunctionComponent<Props> = ({ opened }) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Spinner} />
      <Modal.Title message={messages.title.id} />
    </Modal>
  )
}
