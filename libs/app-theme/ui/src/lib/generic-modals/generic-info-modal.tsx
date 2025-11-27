/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, ReactNode } from "react"
import { ButtonType, IconType } from "app-theme/models"
import { formatMessage } from "app-localize/utils"
import { Button } from "../button/button"
import { Typography } from "../typography/typography"
import { Modal } from "../modal/modal"

interface Props {
  opened: boolean
  onClose: VoidFunction
  title: string
  iconType?: IconType
  description: string
  closeButtonText?: string
  children?: ReactNode
}

export const GenericInfoModal: FunctionComponent<Props> = ({
  opened,
  title,
  iconType = IconType.Info,
  description,
  closeButtonText = formatMessage({ id: "general.app.closeButton.text" }),
  onClose,
  children,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={iconType} />
      <Modal.Title>{title}</Modal.Title>
      <Typography.P1>{description}</Typography.P1>
      {children}
      <Modal.Buttons>
        <Button onClick={onClose} type={ButtonType.Secondary}>
          {closeButtonText}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
