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
import modalService from "Renderer/components/core/modal/modal.service"
import store from "Renderer/store"
import { LANGUAGE } from "Renderer/constants/languages"
import Modal from "Renderer/components/core/modal/modal.component"

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

  modalService.bindStore(store)
  modalService.setDefaultLocale(LANGUAGE.default)

  const openModal = () => {
    modalService.openModal(<Modal>ślubublubl</Modal>)
  }

  return (
    <div>
      <div>Battery level: {batteryLevel}</div>
      <div>OS Version: {osVersion}</div>
      <div>Last backup {lastBackup}</div>
      <div>
        Memory: {memorySpace.free}/{memorySpace.full}
      </div>
      <hr />
      <h2>Device info</h2>
      <button onClick={getInfo}>Get</button>
      <pre id="response" />
      <h2>Battery info</h2>
      <button onClick={handleBattery}>Get</button>
      <pre id="battery" />
      <h2>Network info</h2>
      <button onClick={handleNetwork}>Get</button>
      <pre id="network" />
      <h2>Storage info</h2>
      <button onClick={handleStorage}>Get</button>
      <pre id="storage" />
      <h2>Backups info</h2>
      <button onClick={handleBackups}>Get</button>
      <pre id="backups" />
      <h2>Disconnect device</h2>
      <button onClick={handleDisconnectDevice}>Get</button>
      <pre id="disconnect" />
      <h2>Change sim</h2>
      <button onClick={handleChangeSim}>Get</button>
      <pre id="change-sim" />
      {/*this will be removed*/}
      <button onClick={openModal}>open modal</button>
    </div>
  )
}

export default Overview
