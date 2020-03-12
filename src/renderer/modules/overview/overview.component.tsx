import FunctionComponent from "Renderer/types/function-component.interface"
import { Store as BasicInfoInitialState } from "Renderer/models/basic-info/interfaces"
import React, { useEffect } from "react"
import OverviewUI from "Renderer/modules/overview/overview-ui.component"
import { noop } from "Renderer/utils/noop"
import useSystemUpdateFlow from "Renderer/modules/overview/system-update.hook"

const Overview: FunctionComponent<BasicInfoInitialState> = ({
  batteryLevel = 0,
  changeSim = noop,
  disconnectDevice = noop,
  lastBackup,
  osVersion,
  osUpdateDate = 0,
  pureOsFileName = "",
  pureOsAvailable,
  pureOsDownloaded,
  updatePhoneOsInfo = noop,
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

  const { check, download, install } = useSystemUpdateFlow(
    new Date(osUpdateDate).toISOString(),
    updatePhoneOsInfo
  )

  const onUpdateDownload = () => download(pureOsFileName)

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
      osUpdateAvailable={pureOsAvailable}
      osUpdateAlreadyDownloaded={pureOsDownloaded}
      onUpdateCheck={check}
      onUpdateInstall={install}
      onUpdateDownload={onUpdateDownload}
    />
  )
}

export default Overview
