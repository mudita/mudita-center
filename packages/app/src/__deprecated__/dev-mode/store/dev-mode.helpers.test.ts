/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import store from "App/__deprecated__/renderer/store"
import ipc from "electron-better-ipc"
import { backendAdaptersChannel } from "App/__deprecated__/backend/backend.types"
import {
  isDevModeEnabled,
  toggleDevMode,
  toggleHarmonySimulation,
  togglePureSimulation,
} from "./dev-mode.helpers"

jest.mock("electron-better-ipc", () => ({
  ipcRenderer: {
    callMain: jest.fn(),
  },
}))

describe("Function: isDevModeEnabled", () => {
  test("returns current devMode state", () => {
    expect(isDevModeEnabled()).toBeFalsy()
    store.dispatch.devMode.enableDevMode()
    expect(isDevModeEnabled()).toBeTruthy()
  })
})

describe("Function: toggleDevMode", () => {
  test("changing devMode state to `true` if it's disabled", () => {
    store.dispatch.devMode.disableDevMode()
    expect(store.getState().devMode.enabled).toBeFalsy()
    toggleDevMode()
    expect(store.getState().devMode.enabled).toBeTruthy()
  })

  test("changing devMode state to `false` if it's enabled and", () => {
    store.dispatch.devMode.enableDevMode()
    expect(store.getState().devMode.enabled).toBeTruthy()
    toggleDevMode()
    expect(store.getState().devMode.enabled).toBeFalsy()
  })
})

describe("Function: toggleHarmonySimulation", () => {
  test("changing `harmonySimulation` flag to `true` if it's disabled", () => {
    toggleHarmonySimulation()

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ipc.ipcRenderer.callMain).toHaveBeenCalledWith(
      backendAdaptersChannel
    )
    expect(store.getState().devMode.harmonySimulation).toBeTruthy()
  })

  test("changing `harmonySimulation` flag to `true` if it's enabled", () => {
    store.dispatch.devMode.enableHarmonySimulation()

    toggleHarmonySimulation()

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ipc.ipcRenderer.callMain).toHaveBeenCalledWith(
      backendAdaptersChannel
    )
    expect(store.getState().devMode.harmonySimulation).toBeFalsy()
  })

  test("changing disable `pureSimulation` if it's enabled", () => {
    store.dispatch.devMode.enablePureSimulation()

    toggleHarmonySimulation()

    expect(store.getState().devMode.pureSimulation).toBeFalsy()
  })
})

describe("Function: togglePureSimulation", () => {
  test("changing `pureSimulation` flag to `true` if it's disabled", () => {
    togglePureSimulation()

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ipc.ipcRenderer.callMain).toHaveBeenCalledWith(
      backendAdaptersChannel
    )
    expect(store.getState().devMode.pureSimulation).toBeTruthy()
  })

  test("changing `pureSimulation` flag to `true` if it's enabled", () => {
    store.dispatch.devMode.enableHarmonySimulation()

    togglePureSimulation()

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ipc.ipcRenderer.callMain).toHaveBeenCalledWith(
      backendAdaptersChannel
    )
    expect(store.getState().devMode.pureSimulation).toBeFalsy()
  })

  test("changing disable `harmonySimulation` if it's enabled", () => {
    store.dispatch.devMode.enableHarmonySimulation()

    toggleHarmonySimulation()

    expect(store.getState().devMode.harmonySimulation).toBeFalsy()
  })
})
