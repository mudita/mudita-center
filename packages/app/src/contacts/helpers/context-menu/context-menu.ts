/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import store from "Renderer/store"
import { MenuItem } from "App/context-menu/context-menu.interface"
import { loadContacts } from "App/contacts/actions/load-contacts.action"
import { devClearAllContacts } from "App/contacts/actions/base.action"

const contactsContextMenu: MenuItem[] = [
  {
    label: "Load default contacts",
    click: () => store.dispatch(loadContacts()),
  },
  {
    label: "Clear all contacts",
    click: () => store.dispatch(devClearAllContacts()),
  },
]

export default contactsContextMenu
