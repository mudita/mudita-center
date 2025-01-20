/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { View } from "generic-view/utils"

// @ts-ignore
export const contactsView: View = {
  main: {
    component: "mc-contacts-view",
    config: {
      entityTypes: ["contacts"],
    },
    // @ts-ignore
    screenTitle: "Contacts",
  },
}
