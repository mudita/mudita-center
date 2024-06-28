/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect, useState } from "react"
import { ButtonAction, IconType } from "generic-view/utils"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { modalTransitionDuration } from "generic-view/theme"
import { ButtonSecondary } from "../../../buttons/button-secondary"
import { ButtonPrimary } from "../../../buttons/button-primary"
import { Modal } from "../../../interactive/modal"
import styled, { keyframes } from "styled-components"

const messages = defineMessages({
  title: {
    id: "module.genericViews.dataMigration.cancelConfirm.title",
  },
  description: {
    id: "module.genericViews.dataMigration.cancelConfirm.description",
  },
  cancelButtonLabel: {
    id: "module.genericViews.dataMigration.cancelConfirm.cancelButtonLabel",
  },
  backButtonLabel: {
    id: "module.genericViews.dataMigration.cancelConfirm.backButtonLabel",
  },
  progressTitle: {
    id: "module.genericViews.dataMigration.cancelConfirm.progress.title",
  },
})

interface Props {
  onBackButtonClick?: VoidFunction
  onCancelButtonClick?: VoidFunction
}

export const CancelConfirmModal: FunctionComponent<Props> = ({
  onBackButtonClick,
  onCancelButtonClick,
}) => {
  const title = intl.formatMessage(messages.title)
  const progressTitle = intl.formatMessage(messages.progressTitle)
  const description = intl.formatMessage(messages.description)
  const [cancelRequested, setCancelRequested] = useState(false)

  const backButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      onBackButtonClick?.()
    },
  }

  const cancelButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      setCancelRequested(true)
      setTimeout(() => {
        onCancelButtonClick?.()
      }, modalTransitionDuration)
    },
  }

  useEffect(() => {
    setCancelRequested(false)
  }, [])

  if (cancelRequested) {
    return (
      <>
        <ModalIconSpinner config={{ type: IconType.SpinnerDark }} />
        <Modal.Title>{progressTitle}</Modal.Title>
      </>
    )
  }

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.Exclamation }} />
      <Modal.Title>{title}</Modal.Title>
      <p>{description}</p>
      <Modal.Buttons>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.backButtonLabel),
            action: backButtonAction,
          }}
        />
        <ButtonPrimary
          config={{
            text: intl.formatMessage(messages.cancelButtonLabel),
            action: cancelButtonAction,
          }}
        />
      </Modal.Buttons>
    </>
  )
}

const spinAnimation = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

export const ModalIconSpinner = styled(Modal.TitleIcon)`
  animation: ${spinAnimation} 1s steps(12) infinite;
`
