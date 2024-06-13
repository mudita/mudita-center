/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { AvailableDeviceProperties } from "device-manager/models"
import DeviceListItem from "Core/discovery-device/components/device-list-item.component"

interface Props {
  devices: AvailableDeviceProperties[]
  onDeviceClick: (id: string) => void
}

const Wrapper = styled.div`
  width: 100%;
  overflow: auto;
`
const gridColumnsMap: Record<number | string, string> = {
  1: "repeat(1, minmax(0, 34rem))",
  2: "repeat(2, minmax(0, 34rem))",
  default: "repeat(3, minmax(0, 34rem))",
}

const Container = styled.div<{ devicesLength: number }>`
  display: grid;
  grid-template-columns: ${({ devicesLength }) =>
    gridColumnsMap[devicesLength] || gridColumnsMap.default};
  gap: 2.6rem;
  justify-content: center;
  max-width: 107.2rem;
  margin: 0 auto 2.6rem auto;
`

const DeviceList: FunctionComponent<Props> = ({ devices, onDeviceClick }) => {
  return (
    <Wrapper>
      <Container devicesLength={devices.length}>
        {devices.map((device) => {
          return (
            <DeviceListItem
              key={device.id}
              onDeviceClick={onDeviceClick}
              {...device}
            />
          )
        })}
      </Container>
    </Wrapper>
  )
}

export default DeviceList
