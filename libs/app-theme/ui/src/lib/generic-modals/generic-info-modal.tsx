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
import { TypographyContent } from "../typography/typography-content/typography-content"

export enum CloseVariant {
  Button = "Button",
  Icon = "Icon",
  Both = "Both",
  None = "None",
}

interface Props {
  opened: boolean
  onClose?: VoidFunction
  title: string
  iconType?: IconType
  description?: string | ReactNode
  closeButtonText?: string
  closeVariant?: CloseVariant
  children?: ReactNode
}

export const GenericInfoModal: FunctionComponent<Props> = ({
  opened,
  title,
  iconType = IconType.Info,
  description,
  closeButtonText = formatMessage({ id: "general.app.closeButton.text" }),
  closeVariant = CloseVariant.Button,
  onClose,
  children,
}) => {
  const showIcon =
    closeVariant === CloseVariant.Icon || closeVariant === CloseVariant.Both
  const showButton =
    closeVariant === CloseVariant.Button || closeVariant === CloseVariant.Both

  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={iconType} />
      {showIcon && <Modal.CloseButton onClick={onClose} />}
      <Modal.Title>{title}</Modal.Title>
      <TypographyContent as={Typography.P1}>{description}</TypographyContent>
      {children}
      {showButton && (
        <Modal.Buttons>
          <Button onClick={onClose} type={ButtonType.Secondary}>
            {closeButtonText}
          </Button>
        </Modal.Buttons>
      )}
    </Modal>
  )
}
