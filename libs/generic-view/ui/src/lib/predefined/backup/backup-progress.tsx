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
})

export interface Feature {
  label: string
  key: string
}

interface Props {
  onSuccess: VoidFunction
  onFail: VoidFunction
}

export const BackupProgress: FunctionComponent<Props> = ({
  onSuccess,
  onFail,
}) => {
  const [progress, setProgress] = useState(0)

  // TODO: replace with real backup progress
  const steps = {
    0: "Backing up contacts",
    30: "Backing up messages",
    50: "Backing up notes",
    70: "Backing up calendar events",
    90: "Backing up settings",
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
    }, 500)
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
