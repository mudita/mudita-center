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
  onSuccess: VoidFunction
}

export const BackupRestoreProgress: FunctionComponent<Props> = ({
  features,
  onSuccess,
}) => {
  const [progress, setProgress] = useState(0)

  // TODO: replace with real backup progress
  const steps = {
    0: "Restoring contacts",
    30: "Restoring messages",
    50: "Restoring notes",
    70: "Restoring calendar events",
    90: "Restoring settings",
    100: "Backup complete",
  }

  const [step, setStep] = useState(steps[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          onSuccess()
          return 100
        }
        const nextProgress = prev + Math.ceil(Math.random() * 30)

        for (const [stepProgress, stepMessage] of Object.entries(steps)) {
          if (nextProgress >= parseInt(stepProgress)) {
            setStep(stepMessage)
          }
        }

        return nextProgress
      })
    }, 100)
    return () => clearInterval(interval)
  })
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
          value: progress,
          message: step,
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
