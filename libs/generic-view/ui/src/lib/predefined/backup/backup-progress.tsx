/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect, useState } from "react"
import styled from "styled-components"
import { IconType } from "generic-view/utils"
import { ProgressBar } from "../../interactive/progress-bar/progress-bar"
import { ModalTitleIcon } from "../../interactive/modal"

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

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          onSuccess()
          return 100
        }
        return prev + Math.ceil(Math.random() * 30)
      })
    }, 500)
    return () => clearInterval(interval)
  })

  return (
    <>
      <ModalTitleIcon data={{ type: IconType.Backup }} />
      <h1>Creating backup</h1>
      <p>Please wait and do not unplug Kompakt from your computer.</p>
      <Progress
        config={{
          maxValue: 100,
        }}
        data={{
          value: progress,
          message: "Backing up contacts",
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
