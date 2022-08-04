/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import store from "App/__deprecated__/renderer/store"
import { ContextMenuItem } from "App/__deprecated__/context-menu/context-menu.interface"
import { devClearAllContacts } from "App/contacts/actions/base.action"

const contactsContextMenu: ContextMenuItem[] = [
  {
    label: "Clear all contacts",
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    click: () => store.dispatch(devClearAllContacts()),
  },
]

export default contactsContextMenu
