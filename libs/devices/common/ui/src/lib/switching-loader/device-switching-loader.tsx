/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Icon, Typography } from "app-theme/ui"
import { IconType } from "app-theme/models"
import { defineMessages } from "app-localize/utils"
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
      <Typography.H3 as={"p"} message={messages.title.id} color={"white"} />
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
`

const Loader = styled(Icon)`
  width: 4.8rem;
  height: 4.8rem;
  color: ${({ theme }) => theme.app.color.white};
`
