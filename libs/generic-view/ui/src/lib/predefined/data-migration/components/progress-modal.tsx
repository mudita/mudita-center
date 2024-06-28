/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { Modal } from "../../../interactive/modal/modal"
import { ButtonAction, IconType } from "generic-view/utils"
import { ButtonSecondary } from "../../../buttons/button-secondary"
import { selectDataMigrationProgress } from "generic-view/store"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ProgressBar } from "../../../interactive/progress-bar/progress-bar"
import styled from "styled-components"
import { DataMigrationFeature } from "generic-view/models"
import { CancelConfirmModal } from "./cancel-confirm-modal"

const messages = defineMessages({
  title: {
    id: "module.genericViews.dataMigration.progress.title",
  },
  description: {
    id: "module.genericViews.dataMigration.progress.description",
  },
  cancelButtonLabel: {
    id: "module.genericViews.dataMigration.progress.cancelButtonLabel",
  },
  genericMessage: {
    id: "module.genericViews.dataMigration.progress.genericMessage",
  },
  collectingData: {
    id: "module.genericViews.dataMigration.progress.collectingData",
  },
  transferringData: {
    id: "module.genericViews.dataMigration.progress.transferringData",
  },
})

interface Props {
  onCancel?: VoidFunction
}

export const ProgressModal: FunctionComponent<Props> = ({ onCancel }) => {
  const dataMigrationProgress = useSelector(selectDataMigrationProgress)
  const [cancelRequested, setCancelRequested] = useState(false)

  const cancelAction: ButtonAction = {
    type: "custom",
    callback: () => {
      setCancelRequested(true)
    },
  }

  const abortCancelRequest = () => setCancelRequested(false)

  const label = useMemo(() => {
    const feature = dataMigrationProgress.label?.split("-")[0]
    if (isDataMigrationFeature(feature)) {
      return intl.formatMessage({
        id: `module.genericViews.dataMigration.features.${feature}`,
      })
    }
    return intl.formatMessage(messages.genericMessage)
  }, [dataMigrationProgress.label])

  if (cancelRequested) {
    return (
      <CancelConfirmModal
        onBackButtonClick={abortCancelRequest}
        onCancelButtonClick={onCancel}
      />
    )
  }

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.DataMigration }} />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <p>{intl.formatMessage(messages.description)}</p>
      <ProgressWrapper>
        <ProgressBar
          config={{ maxValue: 100 }}
          data={{
            message: label,
            value: dataMigrationProgress.value,
          }}
        />
      </ProgressWrapper>
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.cancelButtonLabel),
            action: cancelAction,
          }}
        />
      </Modal.Buttons>
    </>
  )
}

const isDataMigrationFeature = (
  feature?: string
): feature is DataMigrationFeature => {
  return (
    !!feature &&
    Object.values(DataMigrationFeature).includes(
      feature as DataMigrationFeature
    )
  )
}

const ProgressWrapper = styled.div`
  align-self: center;
  width: 100%;
  max-width: 22.3rem;
`
