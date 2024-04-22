/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { IconType } from "generic-view/utils"
import { ProgressBar } from "../../interactive/progress-bar/progress-bar"
import { Modal } from "../../interactive/modal"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { useSelector } from "react-redux"
import { backupProgress } from "generic-view/store"

const messages = defineMessages({
  title: {
    id: "module.genericViews.backup.progress.title",
  },
  description: {
    id: "module.genericViews.backup.progress.description",
  },
  progressDetails: {
    id: "module.genericViews.backup.progress.progressDetails",
  },
  progressDetailsForFeature: {
    id: "module.genericViews.backup.progress.progressDetailsForFeature",
  },
})

export interface Feature {
  label: string
  key: string
}

interface Props {
  features: Feature[]
}

export const BackupProgress: FunctionComponent<Props> = ({ features }) => {
  const progressStatus = useSelector(backupProgress)

  const featureLabel = features.find(
    (item) => item.key === progressStatus.featureInProgress
  )?.label
  const detailMessage = featureLabel
    ? intl.formatMessage(messages.progressDetailsForFeature, { featureLabel })
    : intl.formatMessage(messages.progressDetails)

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.Backup }} />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <p>{intl.formatMessage(messages.description)}</p>
      <Progress
        config={{
          maxValue: 100,
        }}
        data={{
          value: progressStatus.progress,
          message: detailMessage,
        }}
      />
    </>
  )
}

const Progress = styled(ProgressBar)`
  progress {
    max-width: 23.3rem;
  }
`
