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
      source: "entities-metadata",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "totalEntities",
          componentField: "data.fields.contactsCount",
        },
      ],
    },
  },
  contactsListTable: {
    component: "table",
    config: {
      formOptions: {
        selectedIdsFieldName: "selectedContacts",
        allIdsFieldName: "allContacts",
      },
    },
    dataProvider: {
      source: "entities-array",
      entitiesType: "contacts",
    },
    childrenKeys: [
      "columnCheckbox",
      "columnName",
      "columnEmpty",
      "columnPhoneNumberOptional",
      "columnPhoneNumberLengthOptional",
    ],
  },
  columnEmpty: {
    component: "table.cell",
    config: {
      width: "100%",
    },
  },
  columnCheckbox: {
    component: "table.cell",
    config: {
      width: "74",
    },
    layout: {
      padding: "0 0 0 32px",
    },
    childrenKeys: ["columnCheckboxTooltip"],
  },
  columnCheckboxTooltip: {
    component: "tooltip",
    config: {
      offset: {
        x: 15,
        y: 15,
      },
      placement: "bottom-right",
    },
    childrenKeys: [
      "contactCheckboxTooltipAnchor",
      "contactCheckboxTooltipContent",
    ],
  },
  contactCheckboxTooltipAnchor: {
    component: "tooltip.anchor",
    childrenKeys: ["contactCheckbox"],
  },
  contactCheckboxTooltipContent: {
    component: "tooltip.content",
    childrenKeys: ["contactCheckboxTooltipContentTextWrapper"],
  },
  contactCheckboxTooltipContentTextWrapper: {
    component: "p5-component",
    config: {
      color: "grey1",
    },
    childrenKeys: ["contactCheckboxTooltipContentText"],
  },
  contactCheckboxTooltipContentText: {
    component: "format-message",
    config: {
      messageTemplate: "Select",
    },
  },
  columnName: {
    component: "table.cell",
    config: {
      width: "479px",
    },
    childrenKeys: ["contactDisplayName"],
  },
  phoneDropdownCounter: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          modifier: "length",
          slice: [1],
          providerField: "phoneNumbers",
          componentField: "data.render",
          condition: "gt",
          value: 0,
        },
      ],
    },
    childrenKeys: ["phoneDropdownCounterTooltip"],
  },
  phoneDropdownCounterTooltip: {
    component: "tooltip",
    config: {
      offset: {
        x: 0,
        y: 16,
      },
      placement: "bottom-left",
    },
    childrenKeys: [
      "phoneDropdownCounterTooltipAnchor",
      "phoneDropdownCounterTooltipContent",
    ],
  },
  phoneDropdownCounterTooltipAnchor: {
    component: "tooltip.anchor",
    childrenKeys: ["phoneDropdownCounterBadge"],
  },
  phoneDropdownCounterBadge: {
    component: "button-text",
    config: {
      actions: [],
      modifiers: ["hover-background"],
    },
    layout: {
      padding: "2px 5px",
    },
    childrenKeys: ["phoneDropdownCounterBadgeText"],
  },
  phoneDropdownCounterBadgeText: {
    component: "format-message",
    config: {
      messageTemplate: "+{phoneNumbersLength}",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          modifier: "length",
          slice: [1],
          providerField: "phoneNumbers",
          componentField: "data.fields.phoneNumbersLength",
        },
      ],
    },
  },
  phoneDropdownCounterTooltipContent: {
    component: "tooltip.content",
    childrenKeys: ["phoneDropdownCounterTooltipContentText"],
  },
  phoneDropdownCounterTooltipContentText: {
    component: "p5-component",
    config: {
      color: "grey1",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "phoneNumbers",
          componentField: "config.text",
          flat: "phoneNumber",
          slice: [1],
          join: "\n",
        },
      ],
    },
  },
}

export default view
