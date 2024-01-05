/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { Device } from "Core/device-manager/reducers/device-manager.interface"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { fontWeight } from "Core/core/styles/theming/theme-getters"
import DeviceList from "Core/discovery-device/components/device-list.component"

interface Props {
  devices: Device[]
  onDeviceClick: (id: string) => void
}

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

const AvailableDeviceList: FunctionComponent<Props> = ({
  devices,
  onDeviceClick,
}) => {
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

      <DeviceList devices={devices} onDeviceClick={onDeviceClick} />
    </AvailableDeviceListContainer>
  )
}

export default AvailableDeviceList
