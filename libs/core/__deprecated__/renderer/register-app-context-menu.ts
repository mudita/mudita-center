/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import store from "Core/__deprecated__/renderer/store"
import ContextMenu from "Core/__deprecated__/context-menu/context-menu"
import contactsContextMenu from "Core/contacts/helpers/context-menu/context-menu"
import importDeviceLogFiles from "Core/__deprecated__/renderer/requests/import-device-log-files.request"
import importDeviceCrashDumpFiles from "Core/__deprecated__/renderer/requests/import-device-crash-dumps-files.request"
import { clearAllThreads } from "Core/messages/actions/base.action"
import getAppPath from "Core/__deprecated__/main/utils/get-app-path"

const cwd = getAppPath("pure-logs")

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const registerAppContextMenu = (menu: ContextMenu) => {
  menu.registerItems("Device", [
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
}

export default registerAppContextMenu
