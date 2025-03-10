/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import {
  selectConnectedDevices,
  selectCurrentDevice,
  setCurrentDevice,
  useDevicesListener,
} from "devices/common/feature"
import { useSql } from "./sql-test"
import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react"
import { SerialPortDeviceInfo } from "app-serialport/models"
import { getApiConfig, getMenuConfig } from "devices/api-device/feature"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { defineMessages, formatMessage } from "app-localize/feature"

const messages = defineMessages({
  title: {
    id: "demo.devices",
  },
  selected: {
    id: "demo.selectedDevice",
  },
})

const StyledApp = styled.div`
  /* Your style here */
  text-align: center;
`

export function App() {
  const dispatch = useDispatch()
  useDevicesListener()
  useSql()

  const connectedDevices = useSelector(selectConnectedDevices)
  const currentDevice = useSelector(selectCurrentDevice)

  const handleSelect = useCallback(
    (device: SerialPortDeviceInfo) => {
      dispatch(setCurrentDevice(device.path))
    },
    [dispatch]
  )

  const handleApiConfigurationCall = useCallback(async () => {
    if (ApiDeviceSerialPort.isCompatible(currentDevice)) {
      const response = await getApiConfig(currentDevice)

      if (response.ok) {
        console.log(response.body)
      } else {
        console.warn(response.status, response.body, response.error)
      }
    }
  }, [currentDevice])

  const handleMenuConfigurationCall = useCallback(async () => {
    if (ApiDeviceSerialPort.isCompatible(currentDevice)) {
      const response = await getMenuConfig(currentDevice)

      if (response.ok) {
        console.log(response.body)
      } else {
        console.warn(response.status, response.body, response.error)
      }
    }
  }, [currentDevice])

  return (
    <StyledApp>
      <Header>{formatMessage(messages.title)}</Header>
      <ul>
        {connectedDevices.map((device) => (
          <li
            key={device.path}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>
              {device.path} ({device.deviceType})
            </p>
            <button onClick={() => handleSelect(device)}>Select</button>
          </li>
        ))}
      </ul>
      <Header>{formatMessage(messages.selected)}</Header>
      {currentDevice && (
        <>
          <p>
            {currentDevice?.path} ({currentDevice?.deviceType})
          </p>
          <button onClick={handleApiConfigurationCall}>
            Call API_CONFIGURATION
          </button>
          <button onClick={handleMenuConfigurationCall}>
            Call MENU_CONFIGURATION
          </button>
        </>
      )}
    </StyledApp>
  )
}

export default App

const Header = styled.h1`
  font-size: ${({ theme }) => theme.app.fontSize.headline4};
`
