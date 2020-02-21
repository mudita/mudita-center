import React from "react"
import { InitialState as BasicInfoInitialState } from "Renderer/models/basicInfo/interfaces"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Phone from "Renderer/components/rest/overview/phone/phone.component"
import Network from "Renderer/components/rest/overview/network/network.component"
import getFakeAdapters from "App/tests/get-fake-adapters"
import System from "Renderer/components/rest/overview/system/system.component"
import FilesManager from "Renderer/components/rest/overview/files-manager/files-manager.component"
import Backup from "Renderer/components/rest/overview/backup/backup.component"
import { noop } from "Renderer/utils/noop"
import availableOsUpdateRequest from "Renderer/requests/available-os-update.request"
import downloadOsUpdateRequest from "Renderer/requests/download-os-update.request"

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

const lastUpdate = "2020-02-19T13:54:22.943Z"

const Overview: FunctionComponent<BasicInfoInitialState> = ({
  batteryLevel,
  lastBackup,
  osVersion,
}) => {
  const checkForUpdates = async () => {
    console.log("Checking for updates...")
    const { available, version, file } = await availableOsUpdateRequest(
      lastUpdate
    )

    if (available) {
      const updateNow = confirm(
        `Pure OS version ${version} is available. Do you want to update it now?`
      )

      if (updateNow && file) {
        await downloadOsUpdateRequest(file)
      } else {
        console.log("Update dismissed")
      }
    }
  }

  return (
    <OverviewWrapper>
      <PhoneInfo
        onDisconnect={noop}
        batteryLevel={batteryLevel}
        network={"Play"}
      />
      <NetworkInfo simCards={getFakeAdapters().pureNetwork.getSimCards()} />
      <System
        osVersion={osVersion}
        lastUpdate={"just now"}
        onUpdateCheck={checkForUpdates}
      />
      <FileManagerInfo usedSpace={16} onFilesOpen={noop} />
      <BackupInfo
        lastBackup={lastBackup}
        onBackupCreate={noop}
        onBackupRestore={noop}
      />
    </OverviewWrapper>
  )
}

export default Overview
