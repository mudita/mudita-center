import React from "react"
import { InitialState as BasicInfoInitialState } from "Renderer/models/basicInfo/interfaces"
import changeSimRequest from "Renderer/requests/change-sim.request"
import disconnectDevice from "Renderer/requests/disconnect-device.request"
import getBackupsInfo from "Renderer/requests/get-backups-info.request"
import getBatteryInfo from "Renderer/requests/get-battery-info.request"
import getDeviceInfo from "Renderer/requests/get-device-info.request"
import getNetworkInfo from "Renderer/requests/get-network-info.request"
import getStorageInfo from "Renderer/requests/get-storage-info.request"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Phone from "Renderer/components/rest/overview/phone/phone.component"
import { action } from "@storybook/addon-actions"
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
  grid-column-gap: 40px;
  grid-row-gap: 32px;
  padding: 3.2rem 3rem 3.7rem 4rem;
`

const PhoneInfo = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-row-gap: 32px;
`

const Overview: FunctionComponent<BasicInfoInitialState> = ({
  batteryLevel,
  lastBackup,
  memorySpace,
  osVersion,
  ...rest
}) => {
  // Warning! DO NOT REVIEW code in this component. It's a throw-away.

  const getInfo = async () => {
    const info = await getDeviceInfo()
    document.getElementById("response")!.innerText = JSON.stringify(
      info,
      null,
      2
    )
  }

  const handleBattery = () =>
    getBatteryInfo().then(result => {
      document.getElementById("battery")!.innerText = JSON.stringify(
        result,
        null,
        2
      )
    })

  const handleNetwork = () =>
    getNetworkInfo().then(result => {
      document.getElementById("network")!.innerText = JSON.stringify(
        result,
        null,
        2
      )
    })

  const handleStorage = () =>
    getStorageInfo().then(result => {
      document.getElementById("storage")!.innerText = JSON.stringify(
        result,
        null,
        2
      )
    })

  const handleBackups = () =>
    getBackupsInfo().then(result => {
      document.getElementById("backups")!.innerText = JSON.stringify(
        result,
        null,
        2
      )
    })

  const handleDisconnectDevice = () =>
    disconnectDevice().then(result => {
      document.getElementById("disconnect")!.innerText = JSON.stringify(
        result,
        null,
        2
      )
    })

  const handleChangeSim = () =>
    changeSimRequest().then(result => {
      document.getElementById("change-sim")!.innerText = JSON.stringify(
        result,
        null,
        2
      )
    })

  return (
    <OverviewWrapper>
      <Phone
        onDisconnect={action("disconnect phone")}
        batteryLevel={0.75}
        network={"Play"}
      />
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
