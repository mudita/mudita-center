import store from "Renderer/store"
import contextMenu from "App/context-menu/context-menu"
import { AppHotkeys } from "App/hotkeys/hotkeys.types"
import { togglePhoneSimulation } from "App/dev-mode/store/dev-mode.helpers"

const registerContextMenu = () => {
  contextMenu.registerItems("Device", [
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

  contextMenu.registerItems("Messages", [
    {
      label: "Load default topics",
      click: () => store.dispatch.messages._devLoadDefaultTopics(),
    },
    {
      label: "Clear all topics",
      click: () => store.dispatch.messages._devClearAllTopics(),
    },
  ])

  contextMenu.registerItems("Contacts", [
    {
      label: "Load default contacts",
      click: () => store.dispatch.phone.loadData(),
    },
    {
      label: "Clear all contacts",
      click: () => store.dispatch.phone._devClearAllContacts(),
    },
  ])

  contextMenu.registerItems("Calendar", [
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

export default registerContextMenu
