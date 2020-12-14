import store from "Renderer/store"
import { AppHotkeys } from "App/hotkeys/hotkeys.types"
import { togglePhoneSimulation } from "App/dev-mode/store/dev-mode.helpers"
import ContextMenu from "App/context-menu/context-menu"

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

  menu.registerItems("Contacts", [
    {
      label: "Load default contacts",
      click: () => store.dispatch.phone._devLoadDefaultContacts(),
    },
    {
      label: "Clear all contacts",
      click: () => store.dispatch.phone._devClearAllContacts(),
    },
  ])

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
