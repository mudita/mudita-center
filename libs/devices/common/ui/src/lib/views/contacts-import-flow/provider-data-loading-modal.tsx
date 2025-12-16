/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Modal, Typography } from "app-theme/ui"
import { defineMessages } from "app-localize/utils"
import { IconType } from "app-theme/models"

const messages = defineMessages({
  title: {
    id: "apiDevice.contacts.import.providerDataLoadingModal.title",
  },
  description: {
    id: "apiDevice.contacts.import.providerDataLoadingModal.description",
  },
})

interface Props {
  opened: boolean
  onClose: VoidFunction
}

export const ProviderDataLoadingModal: FunctionComponent<Props> = ({
  opened,
  onClose,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.Spinner} />
      <Modal.Title message={messages.title.id} />
      <Typography.P1 message={messages.description.id} />
    </Modal>
  )
}
