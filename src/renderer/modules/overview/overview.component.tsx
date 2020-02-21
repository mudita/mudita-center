import FunctionComponent from "Renderer/types/function-component.interface"
import { InitialState as BasicInfoInitialState } from "Renderer/models/basicInfo/interfaces"
import React, { useEffect } from "react"
import OverviewUI from "Renderer/modules/overview/overview-ui.component"

const Overview: FunctionComponent<BasicInfoInitialState> = ({
  batteryLevel,
  lastBackup,
  osVersion,
  loadData,
  memorySpace,
  simCards,
}) => {
  useEffect(() => {
    loadData()
  }, [])

  console.log({ batteryLevel, lastBackup, osVersion, memorySpace, simCards })
  return (
    <OverviewUI
      batteryLevel={batteryLevel}
      lastBackup={lastBackup}
      osVersion={osVersion}
      memorySpace={memorySpace}
      simCards={simCards}
    />
  )
}

export default Overview
