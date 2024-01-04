/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import Table, {
  Row,
} from "Core/__deprecated__/renderer/components/core/table/table.component"
import { Device } from "Core/device-manager/reducers/device-manager.interface"

interface Props {
  devices: Device[]
  onDeviceClick: (id: string) => void
}

const AvailableDeviceList: FunctionComponent<Props> = ({
  devices,
  onDeviceClick,
}) => {
  return (
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
  )
}

export default AvailableDeviceList
