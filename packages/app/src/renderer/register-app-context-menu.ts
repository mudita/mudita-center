/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import store from "Renderer/store"
import { AppHotkeys } from "App/hotkeys/hotkeys.types"
import { togglePhoneSimulation } from "App/dev-mode/store/dev-mode.helpers"
import ContextMenu from "App/context-menu/context-menu"
import contactsContextMenu from "App/contacts/helpers/context-menu/context-menu"

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
  ])

  menu.registerItems("Messages", [
    {
      label: "Load default topics",
      click: () => store.dispatch.messages._devLoadDefaultTopics(),
    },
    {
      label: "Clear all topics",
      click: () => store.dispatch.messages._devClearAllTopics(),
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
