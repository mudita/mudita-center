/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { IconType } from "generic-view/utils"
import { ProgressBar } from "../../interactive/progress-bar/progress-bar"
import { Modal } from "../../interactive/modal"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { useSelector } from "react-redux"
import { selectDataTransferProgress } from "generic-view/store"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { ButtonPrimary } from "../../buttons/button-primary"
import { ButtonAction } from "generic-view/models"

const messages = defineMessages({
  title: {
    id: "module.genericViews.importContacts.progress.title",
  },
  description: {
    id: "module.genericViews.importContacts.progress.description",
  },
  progressDetails: {
    id: "module.genericViews.importContacts.progress.progressDetails",
  },
  cancelButtonLabel: {
    id: "module.genericViews.importContacts.progress.cancelButtonLabel",
  },
  cancelTitle: {
    id: "module.genericViews.importContacts.cancelConfirm.title",
  },
  cancelDescription: {
    id: "module.genericViews.importContacts.cancelConfirm.description",
  },
  cancelBackButtonLabel: {
    id: "module.genericViews.importContacts.cancelConfirm.backButtonLabel",
  },
  cancelAbortButtonLabel: {
    id: "module.genericViews.importContacts.cancelConfirm.cancelButtonLabel",
  },
})

interface Props {
  cancelAction: ButtonAction
}

export const ImportContactsProgress: FunctionComponent<Props> = ({
  cancelAction,
}) => {
  const [cancelRequested, setCancelRequested] = useState(false)
  const { progress } = useSelector(selectDataTransferProgress)
  const detailMessage = intl.formatMessage(messages.progressDetails)

  const requestCancel = () => {
    setCancelRequested(true)
  }

  if (cancelRequested) {
    return (
      <>
        <Modal.TitleIcon config={{ type: IconType.Exclamation }} />
        <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
        <p>{intl.formatMessage(messages.cancelDescription)}</p>
        <Modal.Buttons>
          <ButtonSecondary
            config={{
              actions: [
                {
                  type: "custom",
                  callback: () => setCancelRequested(false),
                },
              ],
              text: intl.formatMessage(messages.cancelBackButtonLabel),
            }}
          />
          <ButtonPrimary
            config={{
              actions: [cancelAction],
              text: intl.formatMessage(messages.cancelAbortButtonLabel),
            }}
          />
        </Modal.Buttons>
      </>
    )
  }

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.Import }} />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <p>{intl.formatMessage(messages.description)}</p>
      <Progress
        config={{
          maxValue: 100,
        }}
        data={{
          value: progress,
          message: detailMessage,
        }}
      />
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary
          config={{
            actions: [
              {
                type: "custom",
                callback: requestCancel,
              },
            ],
            text: intl.formatMessage(messages.cancelButtonLabel),
          }}
        />
      </Modal.Buttons>
    </>
  )
}

const Progress = styled(ProgressBar)`
  progress {
    max-width: 23.3rem;
  }
`
