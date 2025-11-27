/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { IconType } from "app-theme/models"
import { GenericInfoModal } from "./generic-info-modal"

interface Props {
  opened: boolean
  onClose: VoidFunction
  title: string
  description: string
  closeButtonText?: string
}

export const GenericSuccessModal: FunctionComponent<Props> = ({
  opened,
  title,
  description,
  closeButtonText,
  onClose,
}) => {
  return (
    <GenericInfoModal
      opened={opened}
      onClose={onClose}
      title={title}
      iconType={IconType.CheckCircle}
      description={description}
      closeButtonText={closeButtonText}
    />
  )
}
