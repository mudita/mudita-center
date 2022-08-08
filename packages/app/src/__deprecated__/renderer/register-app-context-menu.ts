/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { app } from "@electron/remote"
import store from "App/__deprecated__/renderer/store"
import { AppHotkeys } from "App/__deprecated__/hotkeys/hotkeys.types"
import {
  togglePureSimulation,
  toggleHarmonySimulation,
} from "App/__deprecated__/dev-mode/store/dev-mode.helpers"
import ContextMenu from "App/__deprecated__/context-menu/context-menu"
import contactsContextMenu from "App/contacts/helpers/context-menu/context-menu"
import importDeviceLogFiles from "App/__deprecated__/renderer/requests/import-device-log-files.request"
import packageInfo from "../../../package.json"
import importDeviceCrashDumpFiles from "App/__deprecated__/renderer/requests/import-device-crash-dumps-files.request"
import { clearAllThreads } from "App/messages/actions/base.action"

const cwd = `${app.getPath("appData")}/${packageInfo.name}/pure-logs`

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const registerAppContextMenu = (menu: ContextMenu) => {
  menu.registerItems("Device", [
    {
      labelCreator: () => {
        return store.getState().devMode.pureSimulation
          ? "Stop simulating Pure connection"
          : "Simulate Pure connection"
      },
      click: togglePureSimulation,
      accelerator: AppHotkeys.pureSimulation,
    },
    {
      labelCreator: () => {
        return store.getState().devMode.harmonySimulation
          ? "Stop simulating Harmony connection"
          : "Simulate Harmony connection"
      },
      click: toggleHarmonySimulation,
      accelerator: AppHotkeys.HarmonySimulation,
    },
    {
      label: "Download logs file",
      click: () => importDeviceLogFiles(cwd),
    },
    {
      label: "Download crash dumps file",
      click: () => importDeviceCrashDumpFiles(cwd),
    },
  ])

  menu.registerItems("Messages", [
    {
      label: "Clear all threads",
      click: () => store.dispatch(clearAllThreads()),
    },
  ])

  menu.registerItems("Contacts", contactsContextMenu)

  menu.registerItems("Calendar", [
    {
      label: "Load default events",
      click: () => store.dispatch.calendar._devLoadDefaultEvents(),
    },
    {
      label: "Clear all events",
      click: () => store.dispatch.calendar._devClearAllEvents(),
    },
  ])
}

export default registerAppContextMenu
