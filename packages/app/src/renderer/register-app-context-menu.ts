/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { remote } from "electron"
import store from "Renderer/store"
import { AppHotkeys } from "App/hotkeys/hotkeys.types"
import {
  togglePureSimulation,
  toggleHarmonySimulation,
} from "App/dev-mode/store/dev-mode.helpers"
import ContextMenu from "App/context-menu/context-menu"
import contactsContextMenu from "App/contacts/helpers/context-menu/context-menu"
import importDeviceLogFiles from "Renderer/requests/import-device-log-files.request"
import { name } from "../../package.json"
import importDeviceCrashDumpFiles from "Renderer/requests/import-device-crash-dumps-files.request"
import { loadThreads } from "App/messages/actions"
import { clearAllThreads } from "App/messages/actions/base.action"

const cwd = `${remote.app.getPath("appData")}/${name}/pure-logs`

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
      label: "Load default threads",
      click: () => store.dispatch(loadThreads({ limit: 5, offset: 0 })),
    },
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
