/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { IconType } from "generic-view/utils"
import { ProgressBar } from "../../interactive/progress-bar/progress-bar"
import { Modal } from "../../interactive/modal"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { useSelector } from "react-redux"
import { importContactsProgress } from "generic-view/store"

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

export const ImportContactsProgress = () => {
  const { progress } = useSelector(importContactsProgress)
  const detailMessage = intl.formatMessage(messages.progressDetails)

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
    </>
  )
}

const Progress = styled(ProgressBar)`
  progress {
    max-width: 23.3rem;
  }
`
