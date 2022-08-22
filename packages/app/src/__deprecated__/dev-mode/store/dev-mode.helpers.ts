/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import store from "App/__deprecated__/renderer/store"
import { ipcRenderer } from "electron-better-ipc"
import { DeviceType } from "@mudita/pure"
import { backendAdaptersChannel } from "App/__deprecated__/backend/backend.types"
import { connectDevice, disconnectDevice, unlockedDevice } from "App/device"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isDevModeEnabled = () => {
  return Boolean(store.getState().devMode.enabled)
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const togglePureSimulation = () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  ipcRenderer.callMain(backendAdaptersChannel)

  if (store.getState().devMode.harmonySimulation) {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ipcRenderer.callMain(backendAdaptersChannel)
    store.dispatch.devMode.disableHarmonySimulation()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    store.dispatch(disconnectDevice())
  }

  if (store.getState().devMode.pureSimulation) {
    store.dispatch.devMode.disablePureSimulation()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    store.dispatch(disconnectDevice())
  } else {
    store.dispatch.devMode.enablePureSimulation()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    store.dispatch(connectDevice(DeviceType.MuditaPure))
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(() => store.dispatch(unlockedDevice()))
  }
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toggleHarmonySimulation = () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  ipcRenderer.callMain(backendAdaptersChannel)

  if (store.getState().devMode.pureSimulation) {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ipcRenderer.callMain(backendAdaptersChannel)
    store.dispatch.devMode.disablePureSimulation()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    store.dispatch(disconnectDevice())
  }

  if (store.getState().devMode.harmonySimulation) {
    store.dispatch.devMode.disableHarmonySimulation()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    store.dispatch(disconnectDevice())
  } else {
    store.dispatch.devMode.enableHarmonySimulation()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    store.dispatch(connectDevice(DeviceType.MuditaHarmony))
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(() => store.dispatch(unlockedDevice()))
  }
}
