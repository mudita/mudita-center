/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import {
  selectCurrentDevices,
  useDevicesListener,
} from "devices/common/feature"
import { useSql } from "./sql-test"
import { useSelector } from "react-redux"

const StyledApp = styled.div`
  /* Your style here */
  text-align: center;
`

export function App() {
  useDevicesListener()
  useSql()

  const devices = useSelector(selectCurrentDevices)

  return (
    <StyledApp>
      <h1>Devices:</h1>
      <ul>
        {devices.map((device) => (
          <li key={device.path}>
            {device.path} ({device.deviceType})
          </li>
        ))}
      </ul>
    </StyledApp>
  )
}

export default App
