/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import store from "Renderer/store"
import { MenuItem } from "App/context-menu/context-menu.interface"
import { devClearAllContacts } from "App/contacts/actions/base.action"

const contactsContextMenu: MenuItem[] = [
  {
    label: "Clear all contacts",
    click: () => store.dispatch(devClearAllContacts()),
  },
]

export default contactsContextMenu
