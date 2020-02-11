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

const OverviewWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(27rem, 1fr) minmax(59rem, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 4rem;
  padding: 3.2rem 3rem 3.7rem 4rem;
`

const PhoneInfo = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-row-gap: 3.2rem;
`

const Overview: FunctionComponent<BasicInfoInitialState> = ({
  batteryLevel,
  lastBackup,
  osVersion,
}) => {
  return (
    <OverviewWrapper>
      <Phone onDisconnect={noop} batteryLevel={batteryLevel} network={"Play"} />
      <PhoneInfo>
        <Network simCards={getFakeAdapters().pureNetwork.getSimCards()} />
        <System osVersion={osVersion} lastUpdate={"just now"} />
        <FilesManager usedSpace={16} onFilesOpen={noop} />
        <Backup
          lastBackup={lastBackup}
          onBackupCreate={noop}
          onBackupRestore={noop}
        />
      </PhoneInfo>
    </OverviewWrapper>
  )
}

export default Overview
