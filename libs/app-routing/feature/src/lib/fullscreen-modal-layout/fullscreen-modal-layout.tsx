/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { Outlet } from "react-router"
import { Icon, IconButton, Typography } from "app-theme/ui"
import { IconSize, IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  appName: {
    id: "menu.app.title",
  },
})

export const FullscreenModalLayout: FunctionComponent<{
  onClose?: VoidFunction
}> = ({ onClose }) => {
  return (
    <Wrapper>
      <Header>
        <Heading>
          <MuditaLogo type={IconType.MuditaLogoFull} size={IconSize.AutoMax} />
          <Typography.P2 color={"grey3"}>|</Typography.P2>
          <Typography.P3 color={"grey3"}>
            {formatMessage(messages.appName)}
          </Typography.P3>
        </Heading>
        {onClose && (
          <IconButton
            icon={IconType.Close}
            size={IconSize.Big}
            onClick={onClose}
          />
        )}
      </Header>
      <Outlet />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 8rem 1fr;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.app.color.white};
`

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  justify-self: center;
  width: 100%;
  max-width: 112rem;
  padding: 0 2.4rem;
`

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  white-space: nowrap;
`

const MuditaLogo = styled(Icon)`
  width: auto;
  height: 2rem;
  aspect-ratio: initial;
`
