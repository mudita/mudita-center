/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { View } from "generic-view/utils"

// @ts-ignore
const view: View = {
  main: {
    component: "block-plain",
    config: {
      backgroundColor: "white",
    },
    layout: {
      gridLayout: {
        rows: ["auto", "1fr"],
        columns: ["1fr"],
      },
    },
    childrenKeys: ["emptyListWrapper", "listWrapper"],
    // @ts-ignore
    screenTitle: "Contacts",
  },
  emptyListWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-metadata",
      entitiesType: "contacts",
      fields: [
        {
          modifier: "length",
          providerField: "totalEntities",
          componentField: "data.render",
          condition: "eq",
          value: 0,
        },
      ],
    },
    childrenKeys: ["fullScreenWrapper"],
  },
  listWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-metadata",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "totalEntities",
          componentField: "data.render",
          condition: "gt",
          value: 0,
        },
      ],
    },
    childrenKeys: ["contactsForm"],
  },
  contactsForm: {
    component: "form",
    config: {
      formOptions: {
        defaultValues: {
          selectedContacts: [],
          allContacts: [],
        },
      },
      defaultValues: {
        selectedContacts: [],
        allContacts: [],
      },
    },
    childrenKeys: ["contactsLoader"],
  },
  contactsLoader: {
    component: "entities-loader",
    config: {
      entitiesTypes: ["contacts"],
      text: "Loading contacts, please wait...",
    },
    layout: {
      flexLayout: {
        rowGap: "24px",
        direction: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      gridPlacement: {
        row: 1,
        column: 1,
        width: 1,
        height: 2,
      },
    },
    childrenKeys: ["contactsPanel", "contactsTableWrapper", "appHeaderCounter"],
  },
  contactsTableWrapper: {
    component: "block-plain",
    layout: {
      flexLayout: {
        direction: "row",
      },
    },
    childrenKeys: ["contactsListTable", "detailsWrapper"],
  },
  appHeaderCounterText: {
    component: "format-message",
    config: {
      messageTemplate: "{contactsCount, plural, =0 {} other { (#)}}",
    },
    dataProvider: {
      source: "form-fields",
      formKey: "contactsForm",
      fields: [
        {
          modifier: "length",
          providerField: "allContacts",
          componentField: "data.fields.contactsCount",
        },
      ],
    },
  },
  contactsPanelWrapper: {
    component: "conditional-renderer",
  },
  // contactsListTable: {
  //   component: "table",
  //   config: {
  //     formOptions: {
  //       formKey: "contactsForm",
  //       selectedIdsFieldName: "selectedContacts",
  //       allIdsFieldName: "allContacts",
  //     },
  //   },
  //   childrenKeys: [
  //     "columnCheckbox",
  //     "columnName",
  //     "columnPhoneNumberOptional",
  //     "columnPhoneNumberLengthOptional",
  //   ],
  //   dataProvider: {
  //     source: "entities-array",
  //     entitiesType: "contacts",
  //     sort: [
  //       {
  //         providerField: "sortField",
  //         priority: 1,
  //         direction: "asc",
  //         orderingPatterns: ["/^\\p{L}/miu", "/^\\d/m", "/^\\#/m"],
  //       },
  //     ],
  //     filters: [],
  //   },
  // },
}

export default view
