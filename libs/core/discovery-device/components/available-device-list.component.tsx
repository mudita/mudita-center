/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { fontWeight } from "Core/core/styles/theming/theme-getters"
import DeviceList from "Core/discovery-device/components/device-list.component"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import {
  getAvailableDevicesSelector,
  getFailedDevicesSelector,
  handleDeviceActivated,
} from "device-manager/feature"
import {
  URL_DEVICE_INITIALIZATION,
  URL_ONBOARDING,
} from "Core/__deprecated__/renderer/constants/urls"

const messages = defineMessages({
  headerTitle: { id: "module.availableDeviceList.headerTitle" },
  subheaderTitle: { id: "module.availableDeviceList.subheaderTitle" },
})

const AvailableDeviceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`

const TitlesContainer = styled.div`
  max-width: 107.2rem;
  margin: 4rem auto;
  text-align: center;
`
const HeaderTitle = styled(Text)`
  margin-bottom: 0.8rem;
`
const SubheaderTitle = styled(Text)`
  font-weight: ${fontWeight("default")};
`

const AvailableDeviceList: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const devices = useSelector(getAvailableDevicesSelector)
  const failedDevices = useSelector(getFailedDevicesSelector)

  const handleDeviceClick = async (id: string) => {
    const failedDevice = failedDevices.find((device) => device.id === id)
    if (failedDevice !== undefined) {
      await dispatch(handleDeviceActivated(id))
      history.push(URL_ONBOARDING.troubleshooting)
    } else {
      await dispatch(handleDeviceActivated(id))
      history.push(URL_DEVICE_INITIALIZATION.root)
    }
  }

  return (
    <AvailableDeviceListContainer>
      <TitlesContainer>
        <HeaderTitle
          displayStyle={TextDisplayStyle.Headline1}
          message={messages.headerTitle}
          element={"h1"}
        />
        <SubheaderTitle
          displayStyle={TextDisplayStyle.Paragraph1}
          message={messages.subheaderTitle}
          color="secondary"
          element={"h2"}
        />
      </TitlesContainer>

      <DeviceList devices={devices} onDeviceClick={handleDeviceClick} />
    </AvailableDeviceListContainer>
  )
}

export default AvailableDeviceList
