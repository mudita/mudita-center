/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import PQueue from "p-queue"
import NxWelcome from "./nx-welcome"
import { useSerialPortListener } from "./serialport-test"
import { useSql } from "./sql-test"

const StyledApp = styled.div`
  /* Your style here */
  text-align: center;
`

export function App() {
  useSerialPortListener()
  useSql()
  const requestsQueue = new PQueue({ concurrency: 1, interval: 1 })

  console.log(requestsQueue)

  return (
    <StyledApp>
      <NxWelcome title="frontend-app" />
    </StyledApp>
  )
}

export default App
