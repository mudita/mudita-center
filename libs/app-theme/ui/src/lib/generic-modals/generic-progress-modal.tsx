/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { IconType } from "app-theme/models"
import { Modal } from "../modal/modal"
import { Typography } from "../typography/typography"

interface Props {
  opened: boolean
  title: string
  description?: string
}

export const GenericProgressModal: FunctionComponent<Props> = ({
  opened,
  title,
  description,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Spinner} />
      <Modal.Title>{title}</Modal.Title>
      {description && <Typography.P1>{description}</Typography.P1>}
    </Modal>
  )
}
