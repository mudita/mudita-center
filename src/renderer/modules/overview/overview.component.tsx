import FunctionComponent from "Renderer/types/function-component.interface"
import { InitialState as BasicInfoInitialState } from "Renderer/models/basic-info/interfaces"
import React, { useEffect } from "react"
import OverviewUI from "Renderer/modules/overview/overview-ui.component"

const Overview: FunctionComponent<BasicInfoInitialState> = ({
  batteryLevel,
  changeSim,
  disconnectDevice,
  lastBackup,
  osVersion,
  osUpdateDate,
  loadData,
  memorySpace,
  simCards,
  networkName,
}) => {
  useEffect(() => {
    loadData()
  }, [])
  return (
    <OverviewUI
      batteryLevel={batteryLevel}
      changeSim={changeSim}
      disconnectDevice={disconnectDevice}
      lastBackup={lastBackup}
      osVersion={osVersion}
      osUpdateDate={osUpdateDate}
      memorySpace={memorySpace}
      simCards={simCards}
      networkName={networkName}
    />
  )
}

export default Overview
