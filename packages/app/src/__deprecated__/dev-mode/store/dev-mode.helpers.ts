/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import store from "App/__deprecated__/renderer/store"
import { ipcRenderer } from "electron-better-ipc"
import { DeviceType } from "@mudita/pure"
import { backendAdaptersChannel } from "App/__deprecated__/backend/backend.types"
import { connectDevice, disconnectDevice, unlockedDevice } from "App/device"

export const isDevModeEnabled = () => {
  return Boolean(store.getState().devMode.enabled)
}

export const toggleDevMode = () => {
  if (
    store.getState().devMode.pureSimulation &&
    store.getState().devMode.enabled
  ) {
    togglePureSimulation()
  }
  if (
    store.getState().devMode.harmonySimulation &&
    store.getState().devMode.enabled
  ) {
    toggleHarmonySimulation()
  }
  store.getState().devMode.enabled
    ? store.dispatch.devMode.disableDevMode()
    : store.dispatch.devMode.enableDevMode()
}

export const togglePureSimulation = () => {
  ipcRenderer.callMain(backendAdaptersChannel)

  if (store.getState().devMode.harmonySimulation) {
    ipcRenderer.callMain(backendAdaptersChannel)
    store.dispatch.devMode.disableHarmonySimulation()
    store.dispatch(disconnectDevice())
  }

  if (store.getState().devMode.pureSimulation) {
    store.dispatch.devMode.disablePureSimulation()
    store.dispatch(disconnectDevice())
  } else {
    store.dispatch.devMode.enablePureSimulation()
    store.dispatch(connectDevice(DeviceType.MuditaPure))
    setTimeout(() => store.dispatch(unlockedDevice()))
  }
}

export const toggleHarmonySimulation = () => {
  ipcRenderer.callMain(backendAdaptersChannel)

  if (store.getState().devMode.pureSimulation) {
    ipcRenderer.callMain(backendAdaptersChannel)
    store.dispatch.devMode.disablePureSimulation()
    store.dispatch(disconnectDevice())
  }

  if (store.getState().devMode.harmonySimulation) {
    store.dispatch.devMode.disableHarmonySimulation()
    store.dispatch(disconnectDevice())
  } else {
    store.dispatch.devMode.enableHarmonySimulation()
    store.dispatch(connectDevice(DeviceType.MuditaHarmony))
    setTimeout(() => store.dispatch(unlockedDevice()))
  }
}
