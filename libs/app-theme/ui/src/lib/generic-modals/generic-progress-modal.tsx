/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, ReactNode } from "react"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { formatMessage } from "app-localize/utils"
import { Modal } from "../modal/modal"
import { Typography } from "../typography/typography"
import { Button } from "../button/button"
import { ProgressBar } from "../progress-bar/progress-bar"

interface Props extends GenericProgressModalDescriptionProps {
  opened: boolean
  title: string
  iconType?: IconType
  closeButtonText?: string
  onCancel?: VoidFunction
  children?: ReactNode
}

export const GenericProgressModal: FunctionComponent<Props> = ({
  opened,
  title,
  description,
  progress,
  progressBarMessage,
  onCancel,
  iconType = IconType.Spinner,
  closeButtonText = formatMessage({ id: "general.app.closeButton.text" }),
  children,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={iconType} />
      <Modal.Title>{title}</Modal.Title>
      {children}
      <GenericProgressModalDescription
        description={description}
        progress={progress}
        progressBarMessage={progressBarMessage}
      />
      {onCancel && (
        <Modal.Buttons>
          <Button
            type={ButtonType.Secondary}
            size={ButtonSize.Medium}
            onClick={onCancel}
          >
            {closeButtonText}
          </Button>
        </Modal.Buttons>
      )}
    </Modal>
  )
}

interface GenericProgressModalDescriptionProps {
  description?: string
  progress?: number
  progressBarMessage?: string
}

const GenericProgressModalDescription: FunctionComponent<
  GenericProgressModalDescriptionProps
> = ({ description, progress, progressBarMessage }) => {
  if (progress !== undefined && progressBarMessage !== undefined) {
    return (
      <ProgressBar
        value={progress}
        message={progressBarMessage}
        indeterminate={!progress}
      />
    )
  }

  if (description) {
    return <Typography.P1>{description}</Typography.P1>
  }

  return null
}
