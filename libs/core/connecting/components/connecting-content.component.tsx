/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* eslint-disable @typescript-eslint/no-unsafe-return */

import React from "react"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { SpinnerLoader } from "generic-view/ui"
import { GenericThemeProvider } from "generic-view/theme"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  connectingMessage: {
    id: "module.onboarding.connectingMessage",
  },
  connectingLongMessage: {
    id: "module.onboarding.connectingLongMessage",
  },
})

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: auto;
`

const ConnectingText = styled.p`
  font-size: ${({ theme }) => theme.generic.fontSize.headline3};
  line-height: ${({ theme }) => theme.generic.lineHeight.headline3};
  color: ${({ theme }) => theme.generic.color.white};
  font-weight: ${({ theme }) => theme.generic.fontWeight.bold};
  margin: 2.4rem 0 0;
`

interface Props {
  onCancel?: () => void
  longerConnection?: boolean
}

const ConnectingContent: FunctionComponent<Props> = ({
  longerConnection = false,
}) => {
  return (
    <GenericThemeProvider>
      <Container>
        <SpinnerLoader />
        <ConnectingText>
          {longerConnection
            ? intl.formatMessage(messages.connectingLongMessage)
            : intl.formatMessage(messages.connectingMessage)}
        </ConnectingText>
      </Container>
    </GenericThemeProvider>
  )
}

export default ConnectingContent
