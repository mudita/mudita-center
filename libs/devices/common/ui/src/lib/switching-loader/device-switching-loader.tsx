/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Icon } from "app-theme/ui"
import { IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import styled from "styled-components"

const messages = defineMessages({
  title: {
    id: "general.components.deviceSwitching.title",
  },
})

export const DeviceSwitchingLoader: FunctionComponent = () => {
  return (
    <Overlay>
      <Loader type={IconType.Spinner} />
      <h3>{formatMessage(messages.title)}</h3>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  background-color: ${({ theme }) => theme.app.color.blackAlpha.medium};

  h3 {
    font-size: ${({ theme }) => theme.app.fontSize.headline3};
    line-height: ${({ theme }) => theme.app.lineHeight.headline3};
    font-weight: ${({ theme }) => theme.app.fontWeight.bold};
    color: ${({ theme }) => theme.app.color.white};
    margin: 0;
  }
`

const Loader = styled(Icon)`
  width: 4.8rem;
  height: 4.8rem;
  color: ${({ theme }) => theme.app.color.white};
`
