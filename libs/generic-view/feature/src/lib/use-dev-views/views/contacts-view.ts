/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { View } from "generic-view/utils"

// @ts-ignore
const view: View = {
  contactsLoader: {
    component: "entities-loader",
    config: {
      entitiesTypes: ["contacts"],
    },
    layout: {
      flexLayout: {
        direction: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "24px",
      },
      gridPlacement: {
        row: 1,
        column: 1,
        width: 1,
        height: 2,
      },
    },
    childrenKeys: [
      "contactsPanelWrapper",
      "contactsFormWrapper",
      "emptyListWrapper",
      "appHeader",
    ],
  },
  appHeader: {
    component: "app-portal",
    config: {
      portal: "app-header",
    },
    childrenKeys: ["appHeaderText"],
  },
  appHeaderText: {
    component: "format-message",
    config: {
      messageTemplate: " ({contactsCount})",
    },
    dataProvider: {
      source: "form-fields-v2",
      formName: "contactsForm",
      fields: [
        {
          providerField: "allContacts",
          componentField: "data.fields.contactsCount",
          modifier: "length",
        }
      ]
    },
  },
}

export default view
