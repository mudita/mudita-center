/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { TopBar } from "./components/top-bar"
import { SettingsModal } from "./components/settings-modal"

export const QuotationsPage: FunctionComponent = () => {
  const [settingsOpened, setSettingsOpened] = useState(false)

  const handleSettingsClick = () => {
    setSettingsOpened(true)
  }

  const handleSettingsClose = () => {
    setSettingsOpened(false)
  }

  return (
    <Wrapper>
      <TopBar onSettingsClick={handleSettingsClick} />
      <SettingsModal open={settingsOpened} handleClose={handleSettingsClose} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
`
