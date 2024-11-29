/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { View } from "generic-view/utils"

// @ts-ignore
const view: View = {
  main: {
    component: "block-plain",
    childrenKeys: ["contactsWrapper"],
    // @ts-ignore
    screenTitle: "Contacts",
  },
  contactsWrapper: {
    component: "mc-contacts-view",
    config: {
      entityType: "contacts",
    },
  },
}

export default view
