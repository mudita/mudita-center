/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { ModalTitleIcon } from "../../interactive/modal"
import { IconType } from "generic-view/utils"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import styled, { keyframes } from "styled-components"

const messages = defineMessages({
  title: {
    id: "module.genericViews.importContacts.loaderModal.title",
  },
  description: {
    id: "module.genericViews.importContacts.loaderModal.description",
  },
})

export const ImportContactsLoader = () => {
  return (
    <>
      <StyledLoader data={{ type: IconType.SpinnerDark }} />
      <h1>{intl.formatMessage(messages.title)}</h1>
      <Article>
        <p>{intl.formatMessage(messages.description)}</p>
      </Article>
    </>
  )
}

const Article = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const spinAnimation = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

const StyledLoader = styled(ModalTitleIcon)`
  animation: ${spinAnimation} 1s steps(12) infinite;
`
