import React from "react"
import { InitialState as BasicInfoInitialState } from "Renderer/models/basic-info/interfaces"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Phone from "Renderer/components/rest/overview/phone/phone.component"
import Network from "Renderer/components/rest/overview/network/network.component"
import System from "Renderer/components/rest/overview/system/system.component"
import FilesManager from "Renderer/components/rest/overview/files-manager/files-manager.component"
import Backup from "Renderer/components/rest/overview/backup/backup.component"
import { noop } from "Renderer/utils/noop"

const PhoneInfo = styled(Phone)`
  grid-area: Phone;
`

const NetworkInfo = styled(Network)`
  grid-area: Network;
`

const FileManagerInfo = styled(FilesManager)`
  grid-area: FilesManager;
`

const BackupInfo = styled(Backup)`
  grid-area: Backup;
`

const OverviewWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(27rem, 1fr) minmax(59rem, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 4rem;
  grid-row-gap: 3.2rem;
  padding: 3.2rem 3rem 3.7rem 4rem;
  grid-template-areas:
    "Phone Network"
    "Phone System"
    "Phone FilesManager"
    "Phone Backup";
`

const OverviewUI: FunctionComponent<Omit<
  BasicInfoInitialState,
  "loadData"
>> = ({
  batteryLevel,
  changeSim,
  disconnectDevice,
  networkName,
  lastBackup,
  osVersion,
  osUpdateDate,
  memorySpace,
  simCards,
}) => {
  return (
    <OverviewWrapper>
      <PhoneInfo
        batteryLevel={batteryLevel}
        network={networkName}
        onDisconnect={disconnectDevice}
      />
      <NetworkInfo simCards={simCards} onSimChange={changeSim} />
      <System
        osVersion={osVersion}
        lastUpdate={new Date(osUpdateDate).toLocaleDateString("en-US")}
      />
      <FileManagerInfo
        usedSpace={memorySpace.full - memorySpace.free}
        maxSpace={memorySpace.full}
        onFilesOpen={noop}
      />
      <BackupInfo
        lastBackup={lastBackup}
        onBackupCreate={noop}
        onBackupRestore={noop}
      />
    </OverviewWrapper>
  )
}

export default OverviewUI
