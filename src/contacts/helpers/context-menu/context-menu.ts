/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import store from "Renderer/store"
import { MenuItem } from "App/context-menu/context-menu.interface"

const contactsContextMenu: MenuItem[] = [
  {
    label: "Load default contacts",
    click: () => store.dispatch.contacts.loadData(),
  },
  {
    label: "Clear all contacts",
    click: () => store.dispatch.contacts._devClearAllContacts(),
  },
]

export default contactsContextMenu
