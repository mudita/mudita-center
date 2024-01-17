/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { useSelector } from "react-redux"
import { KompaktDeviceData } from "Core/device/reducers"
import { FunctionComponent } from "Core/core/types/function-component.interface"

export const KompaktOverview: FunctionComponent = () => {
  const {
    batteryLevel,
    caseColour,
    networkLevel,
    networkName,
    serialNumber,
    osVersion,
  } = useSelector(
    (state: ReduxRootState) => state.device.data as KompaktDeviceData
  )

  return (
    <div>
      <h3>batteryLevel: {batteryLevel * 100}%</h3>
      <h3>caseColour: {caseColour}</h3>
      <h3>networkName: {networkName}</h3>
      <h3>networkLevel: {networkLevel}</h3>
      <h3>serialNumber: {serialNumber}</h3>
      <h3>osVersion: {osVersion}</h3>
    </div>
  )
}
