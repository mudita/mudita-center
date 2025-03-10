/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { Modal } from "../../interactive/modal"
import { IconType } from "generic-view/utils"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import styled, { keyframes } from "styled-components"

const messages = defineMessages({
  title: {
    id: "module.genericViews.importContacts.refreshingModal.title",
  },
  description: {
    id: "module.genericViews.importContacts.refreshingModal.description",
  },
})

export const ImportContactsRefreshing = () => {
  return (
    <>
      <StyledLoader config={{ type: IconType.SpinnerDark }} />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <p>{intl.formatMessage(messages.description)}</p>
    </>
  )
}

const spinAnimation = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

const StyledLoader = styled(Modal.TitleIcon)`
  animation: ${spinAnimation} 1s steps(12) infinite;
`
