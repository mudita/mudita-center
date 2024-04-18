/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect, useState } from "react"
import styled from "styled-components"
import { IconType } from "generic-view/utils"
import { ProgressBar } from "../../interactive/progress-bar/progress-bar"
import { Modal } from "../../interactive/modal"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

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
})

interface Props {
  onFinish: VoidFunction
}

export const ImportContactsProgress: FunctionComponent<Props> = ({
  onFinish,
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 15, 100))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      onFinish()
    }
  }, [progress, onFinish])

  // TODO: Implement messages coming from device and leave the current one as a default
  const detailMessage = intl.formatMessage(messages.progressDetails)

  return (
    <>
      <Modal.TitleIcon data={{ type: IconType.Import }} />
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
    </>
  )
}

const Progress = styled(ProgressBar)`
  progress {
    max-width: 23.3rem;
  }
`
