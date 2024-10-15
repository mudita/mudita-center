/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { View } from "generic-view/utils"

// @ts-ignore
const view: View = {
  contactsForm: {
    component: "form",
    config: {
      formOptions: {
        defaultValues: {
          selectedContacts: [],
          allContacts: [],
        },
      },
      defaultFields: {
        selectedContacts: [],
        allContacts: [],
        activeContactId: undefined,
      },
    },
    childrenKeys: ["contactsLoader"],
  },
}

export default view
