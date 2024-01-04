/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import Table, {
  Row,
} from "Core/__deprecated__/renderer/components/core/table/table.component"
import { Device } from "Core/device-manager/reducers/device-manager.interface"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import styled from "styled-components"
import { fontWeight } from "Core/core/styles/theming/theme-getters"

interface Props {
  devices: Device[]
  onDeviceClick: (id: string) => void
}

const messages = defineMessages({
  headerTitle: { id: "module.availableDeviceList.headerTitle" },
  subheaderTitle: { id: "module.availableDeviceList.subheaderTitle" },
})

const AvailableDeviceListContainer = styled.div``

const TitlesContainer = styled.div`
  text-align: center;
  margin: 4rem 0;
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

      <Table role="list">
        {devices.map((device) => {
          return (
            <Row
              key={device.id}
              role="listitem"
              onClick={() => onDeviceClick(device.id)}
            >
              {JSON.stringify(device)}
            </Row>
          )
        })}
      </Table>
    </AvailableDeviceListContainer>
  )
}

export default AvailableDeviceList
