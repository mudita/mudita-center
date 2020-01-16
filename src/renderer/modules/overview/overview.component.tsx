import React from "react"
import { InitialState as BasicInfoInitialState } from "Renderer/models/basicInfo/interfaces"
import getDeviceInfo from "Renderer/requests/get-device-info.request"
import FunctionComponent from "Renderer/types/function-component.interface"

const Overview: FunctionComponent<BasicInfoInitialState> = ({
  batteryLevel,
  lastBackup,
  memorySpace,
  osVersion,
  ...rest
}) => {
  // FIXME: Remove this code later, when proper endpoints become available. Its purpose is to showcase requests functionality.
  const getInfo = async () => {
    const info = await getDeviceInfo("front-end passed value")
    document.getElementById("response")!.innerText = JSON.stringify(
      info,
      null,
      2
    )
  }
  return (
    <div>
      <pre id="response" />
      <button onClick={getInfo}>Get Device Info</button>
      <div>Battery level: {batteryLevel}</div>
      <div>OS Version: {osVersion}</div>
      <div>Last backup {lastBackup}</div>
      <div>
        Memory: {memorySpace.free}/{memorySpace.full}
      </div>
    </div>
  )
}

export default Overview
