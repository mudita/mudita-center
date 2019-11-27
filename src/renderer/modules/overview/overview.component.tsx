import React from "react"

import { InitialState as BasicInfoInitialState } from "Renderer/models/basicInfo/interfaces"
import FunctionComponent from "Renderer/types/function-component.interface"

const Overview: FunctionComponent<BasicInfoInitialState> = ({
  batteryLevel,
  lastBackup,
  memorySpace,
  osVersion,
  ...rest
}) => {
  return (
    <div>
      <div>Battery level: {batteryLevel}</div>
      <div>OS Version: {osVersion}</div>
      <div>Last backup {lastBackup}</div>
      <div>
        Memory: {memorySpace.free}/{memorySpace.full}
      </div>
    </div>
  )
}

export default Overview
