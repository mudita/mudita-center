/**
 * Please do not review.
 * This component is going to be merged with https://github.com/Appnroll/pure-desktop-app/pull/75
 */
import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Phone from "Renderer/components/rest/overview/phone/phone.component"
import Network from "Renderer/components/rest/overview/network/network.component"
import getFakeAdapters from "App/tests/get-fake-adapters"
import System from "Renderer/components/rest/overview/system/system.component"
import FilesManager from "Renderer/components/rest/overview/files-manager/files-manager.component"
import Backup from "Renderer/components/rest/overview/backup/backup.component"
import { noop } from "Renderer/utils/noop"
import { InitialState as BasicInfoInitialState } from "Renderer/models/basicInfo/interfaces"

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

interface OverviewUIProps extends BasicInfoInitialState {
  lastUpdate: string
  onUpdateCheck: () => void
}

const OverviewUI: FunctionComponent<Partial<OverviewUIProps>> = ({
  batteryLevel = 1,
  lastBackup = "2020-02-11T13:54:32.943Z",
  lastUpdate = "2020-02-18T13:54:32.943Z",
  osVersion = "1.0.0",
  onUpdateCheck = noop,
}) => (
  <OverviewWrapper>
    <PhoneInfo
      onDisconnect={noop}
      batteryLevel={batteryLevel}
      network={"Play"}
    />
    <NetworkInfo simCards={getFakeAdapters().pureNetwork.getSimCards()} />
    <System
      osVersion={osVersion}
      lastUpdate={new Date(lastUpdate).toLocaleDateString()}
      onUpdateCheck={onUpdateCheck}
    />
    <FileManagerInfo usedSpace={16} onFilesOpen={noop} />
    <BackupInfo
      lastBackup={new Date(lastBackup).toLocaleDateString()}
      onBackupCreate={noop}
      onBackupRestore={noop}
    />
  </OverviewWrapper>
)

export default OverviewUI
