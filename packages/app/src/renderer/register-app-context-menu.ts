/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import store from "Renderer/store"
import { AppHotkeys } from "App/hotkeys/hotkeys.types"
import { togglePhoneSimulation } from "App/dev-mode/store/dev-mode.helpers"
import ContextMenu from "App/context-menu/context-menu"
import contactsContextMenu from "App/contacts/helpers/context-menu/context-menu"
import importDeviceErrorFile from "Renderer/requests/import-device-error-file.request"
import { remote } from "electron"
import { name } from "../../package.json"

const filePath = `${remote.app.getPath("appData")}/${name}/pure-logs.txt`

const registerAppContextMenu = (menu: ContextMenu) => {
  menu.registerItems("Device", [
    {
      labelCreator: () => {
        return store.getState().devMode.phoneSimulation
          ? "Stop simulating connection"
          : "Simulate connection"
      },
      click: togglePhoneSimulation,
      accelerator: AppHotkeys.PhoneSimulation,
    },
    {
      label: "Download error file",
      click: () => importDeviceErrorFile(filePath),
    },
  ])

  menu.registerItems("Messages", [
    {
      label: "Load default threads",
      click: () => store.dispatch.messages.loadData(),
    },
    {
      label: "Clear all threads",
      click: () => store.dispatch.messages._devClearAllThreads(),
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
