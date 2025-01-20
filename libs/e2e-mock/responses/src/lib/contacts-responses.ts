/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const contactsData = {}

export const contactsConfig = {
  main: {
    screenTitle: "Contacts",
    component: "block-plain",
    childrenKeys: ["fullScreenWrapper"],
    layout: {
      flexLayout: {
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },
  fullScreenWrapper: {
    component: "block-plain",
    childrenKeys: ["title", "detailText", "importContactsButton"],
    layout: {
      flexLayout: {
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
        rowGap: "8px",
        columnGap: "8px",
      },
    },
  },
  title: {
    component: "typography.h3",
    config: { text: "Import your contacts" },
  },
  detailText: {
    component: "typography.p1",
    config: { text: "Import all your contacts from a singles ource." },
  },
  importContactsButton: {
    component: "mc-import-contacts-button",
    config: { text: "import contacts" },
    layout: { margin: "16px" },
  },
}
