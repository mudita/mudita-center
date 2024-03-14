/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect, useState } from "react"
import styled from "styled-components"
import { IconType } from "generic-view/utils"
import { ProgressBar } from "../../interactive/progress-bar/progress-bar"
import { ModalTitleIcon } from "../../interactive/modal"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { useSelector } from "react-redux"
import { selectBackupRestoreProgress } from "generic-view/store"
import { RestoreFeature } from "device/models"

const messages = defineMessages({
  title: {
    id: "module.genericViews.restore.progress.title",
  },
  description: {
    id: "module.genericViews.restore.progress.description",
  },
  progressDetails: {
    id: "module.genericViews.restore.progress.progressDetails",
  },
  progressDetailsForFeature: {
    id: "module.genericViews.restore.progress.progressDetailsForFeature",
  },
})

interface Props {
  features: RestoreFeature[]
}

export const BackupRestoreProgress: FunctionComponent<Props> = ({
  features,
}) => {
  const progressStatus = useSelector(selectBackupRestoreProgress)
  // const [progress, setProgress] = useState(0)

  // TODO: replace with real backup progress
  // const steps = {
  //   0: "Restoring contacts",
  //   30: "Restoring messages",
  //   50: "Restoring notes",
  //   70: "Restoring calendar events",
  //   90: "Restoring settings",
  //   100: "Backup complete",
  // }

  // const [step, setStep] = useState(steps[0])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prev) => {
  //       if (prev >= 100) {
  //         clearInterval(interval)
  //         onSuccess()
  //         return 100
  //       }
  //       const nextProgress = prev + Math.ceil(Math.random() * 30)

  //       for (const [stepProgress, stepMessage] of Object.entries(steps)) {
  //         if (nextProgress >= parseInt(stepProgress)) {
  //           setStep(stepMessage)
  //         }
  //       }

  //       return nextProgress
  //     })
  //   }, 100)
  //   return () => clearInterval(interval)
  // })
  const featureLabel = features.find(
    (item) => item.feature === progressStatus.featureInProgress
  )?.label
  const detailMessage = featureLabel
    ? intl.formatMessage(messages.progressDetailsForFeature, { featureLabel })
    : intl.formatMessage(messages.progressDetails)

  return (
    <>
      <ModalTitleIcon data={{ type: IconType.Backup }} />
      <h1>{intl.formatMessage(messages.title)}</h1>
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
