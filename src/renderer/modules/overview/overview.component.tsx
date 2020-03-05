import FunctionComponent from "Renderer/types/function-component.interface"
import { Store as BasicInfoInitialState } from "Renderer/models/basic-info/interfaces"
import React, { useEffect } from "react"
import OverviewUI from "Renderer/modules/overview/overview-ui.component"
import { noop } from "Renderer/utils/noop"

const Overview: FunctionComponent<BasicInfoInitialState> = ({
  batteryLevel = 0,
  changeSim = noop,
  disconnectDevice = noop,
  lastBackup,
  osVersion,
  osUpdateDate = 0,
  loadData = noop,
  memorySpace = {
    free: 0,
    full: 16000000000,
  },
  simCards = [
    {
      network: undefined,
      active: false,
      number: 0,
      slot: 1,
    },
  ],
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
