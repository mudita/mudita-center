/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { KompaktOverviewProps } from "App/overview/components/overview-screens/kompakt-overview/kompakt-overview.component.interface"

export const KompaktOverview: FunctionComponent<KompaktOverviewProps> = ({
  batteryLevel = 0,
  caseColour,
  networkName,
  networkLevel,
  serialNumber,
  osVersion,
}) => {
  return (
    <div>
      <p>batteryLevel: {batteryLevel * 100}%</p>
      <p>caseColour: {caseColour}</p>
      <p>networkName: {networkName}</p>
      <p>networkLevel: {networkLevel}</p>
      <p>serialNumber: {serialNumber}</p>
      <p>osVersion: {osVersion}</p>
    </div>
  )
}
