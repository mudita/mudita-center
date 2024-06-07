/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../../interactive/modal/modal"
import { ButtonAction, IconType } from "generic-view/utils"
import { ButtonSecondary } from "../../../buttons/button-secondary"
import {
  DataTransferProgressLabel,
  selectDataMigrationProgress,
  selectDataMigrationStatus,
  setDataMigrationStatus,
} from "generic-view/store"
import { modalTransitionDuration } from "generic-view/theme"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ProgressBar } from "../../../interactive/progress-bar/progress-bar"
import styled from "styled-components"
import {
  DataMigrationFeature,
  DataMigrationProgressStep,
} from "generic-view/models"

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
  collectingData: {
    id: "module.genericViews.dataMigration.progress.collectingData",
  },
})

interface Props {
  onCancel?: VoidFunction
}

export const ProgressModal: FunctionComponent<Props> = ({ onCancel }) => {
  const dispatch = useDispatch()
  const dataMigrationStatus = useSelector(selectDataMigrationStatus)
  const dataMigrationProgress = useSelector(selectDataMigrationProgress)
  const [opened, setOpened] = useState(false)

  const cancelAction: ButtonAction = {
    type: "custom",
    callback: () => {
      setOpened(false)
      setTimeout(() => {
        onCancel?.()
        dispatch(setDataMigrationStatus("idle"))
      }, modalTransitionDuration)
    },
  }

  const label = useMemo(() => {
    if (isDataMigrationFeature(dataMigrationProgress.feature)) {
      return intl.formatMessage({
        id: `module.genericViews.dataMigration.features.${dataMigrationProgress.feature}`,
      })
    }
    switch (dataMigrationProgress.feature) {
      case DataMigrationProgressStep.CollectingData:
        return intl.formatMessage(messages.collectingData)
      default:
        return ""
    }
  }, [dataMigrationProgress.feature])

  useEffect(() => {
    if (dataMigrationStatus === "in-progress") {
      setOpened(true)
    }
  }, [dataMigrationStatus])

  return (
    <Modal
      config={{ defaultOpened: opened, size: "small" }}
      componentKey={"data-migration-progress"}
    >
      <Modal.TitleIcon config={{ type: IconType.DataMigration }} />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <p>{intl.formatMessage(messages.description)}</p>
      <ProgressWrapper>
        <ProgressBar
          config={{ maxValue: 100 }}
          data={{
            message: label,
            value: dataMigrationProgress.progress,
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
    </Modal>
  )
}

const isDataMigrationFeature = (
  feature?: DataTransferProgressLabel
): feature is DataMigrationFeature => {
  return !!feature && Object.keys(DataMigrationFeature).includes(feature)
}

const ProgressWrapper = styled.div`
  align-self: center;
  width: 100%;
  max-width: 22.3rem;
`
