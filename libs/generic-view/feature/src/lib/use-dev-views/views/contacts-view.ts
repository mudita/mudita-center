/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { View } from "generic-view/utils"

const view: View = {
  main: {
    // @ts-ignore
    screenTitle: "Contacts",
    component: "block-plain",
    layout: {
      gridLayout: {
        rows: ["auto", "auto", "1fr"],
        columns: ["1fr"],
      },
    },
    childrenKeys: ["contactsPanel", "contactsLoader"],
  },
  contactsPanel: {
    component: "block-box",
    childrenKeys: ["contactsSearch", "contactsButtonActions"],
    layout: {
      gridLayout: {
        rows: [],
        columns: ["280px", "344px"],
        justifyContent: "space-between",
      },
    },
  },
  contactsSearch: {
    component: "form",
    config: {
      formOptions: {
        defaultValues: {
          searchedContact: undefined,
        },
      },
    },
    childrenKeys: ["contactsSearchWrapper"],
  },
  contactsSearchWrapper: {
    component: "block-plain",
    childrenKeys: ["contactsSearchInput"],
  },
  contactsSearchInput: {
    component: "form.searchInput",
    config: {
      label: "Search all contacts",
      name: "searchedContact",
    },
  },
  contactsButtonActions: {
    component: "modal.buttons",
    childrenKeys: ["createContactsButton", "importContactsButton"],
  },
  importContactsButton: {
    component: "button-primary",
    config: {
      text: "import contacts",
      actions: [
        {
          type: "open-modal",
          modalKey: "importContactsButton-modal",
          domain: "import-contacts",
        },
      ],
    },
  },
  createContactsButton: {
    component: "button-secondary",
    config: {
      disabled: true,
      text: "add contact",
      actions: [
        {
          type: "custom",
          callback: () => console.log("`createContactsButton` click!"),
        },
      ],
    },
  },
  contactsLoader: {
    component: "entities-loader",
    config: {
      entitiesTypes: ["contacts"],
    },
    childrenKeys: ["contactsForm"],
  },
  contactsForm: {
    component: "form",
    config: {
      formOptions: {
        defaultValues: {
          activeContactId: undefined,
          selectedContacts: [],
          totalContacts: 0,
        },
      },
    },
    childrenKeys: ["deleteButton", "contactsFormWrapper"],
  },
  deleteButton: {
    component: "button-primary",
    dataProvider: {
      source: "form-fields",
      fields: {
        "config.actions[0].ids": "selectedContacts",
        "config.disabled": {
          field: "selectedContacts",
          modifier: "length",
          condition: "eq",
          value: 0,
        },
      },
    },
    config: {
      text: "Delete selected",
      actions: [
        {
          type: "entities-delete",
          entitiesType: "contacts",
          ids: [],
        },
        {
          type: "form-set-field",
          key: "selectedContacts",
          value: [],
        },
      ],
    },
  },
  contactsFormWrapper: {
    component: "block-box",
    layout: {
      flexLayout: {
        direction: "row",
      },
    },
    childrenKeys: ["contactsListTable", "detailsWrapper"],
  },
  contactsListTable: {
    component: "table",
    dataProvider: {
      source: "entities-array",
      entitiesType: "contacts",
      sort: {
        firstName: {
          priority: 2,
          direction: "asc",
        },
        lastName: {
          priority: 1,
          direction: "asc",
          orderingPatterns: ["/^\\p{L}/miu", "/^\\d/m", "/^\\#/m"],
        },
      },
      filters: {
        firstName: ["/.+/"],
      },
    },
    config: {
      formOptions: {
        activeIdFieldName: "activeContactId",
        selectedIdsFieldName: "selectedContacts",
        totalItemsFieldName: "totalContacts",
      },
    },
    childrenKeys: ["columnCheckbox", "columnName", "columnOptional"],
  },
  columnCheckbox: {
    component: "table.cell",
    config: {
      width: 40,
    },
    childrenKeys: ["contactCheckbox"],
  },
  contactCheckbox: {
    component: "form.checkboxInput",
    config: {
      name: "selectedContacts",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "config.value": "contactId",
      },
    },
  },
  columnName: {
    component: "table.cell",
    config: {
      width: 300,
    },
    childrenKeys: ["contactJoinedNames"],
  },
  contactJoinedNames: {
    component: "block-plain",
    layout: {
      flexLayout: {
        direction: "row",
        columnGap: "0.5rem",
      },
    },
    childrenKeys: ["contactFirstName", "contactLastName"],
  },
  contactFirstName: {
    component: "block-plain",
    layout: {
      flexLayout: {
        direction: "row",
        columnGap: "0.5rem",
      },
    },
    childrenKeys: ["contactFirstNamePrefix", "contactFirstNameValue"],
  },
  contactFirstNamePrefix: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "namePrefix",
      },
    },
  },
  contactFirstNameValue: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "firstName",
      },
    },
  },
  contactLastName: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "lastName",
      },
    },
  },
  columnOptional: {
    component: "form.conditionalRenderer",
    config: {
      formFieldName: "activeContactId",
      renderIfFalse: true,
    },
    childrenKeys: ["columnPhoneNumber"],
  },
  columnPhoneNumber: {
    component: "table.cell",
    config: {
      width: 200,
    },
    childrenKeys: ["contactPhoneNumber"],
  },
  contactPhoneNumber: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "phoneNumbers[0].phoneNumber",
      },
    },
  },
  detailsWrapper: {
    component: "form.conditionalRenderer",
    config: {
      formFieldName: "activeContactId",
    },
    childrenKeys: ["details"],
  },
  details: {
    component: "block-box",
    config: {
      title: "Contact",
    },
    dataProvider: {
      source: "form-fields",
      fields: {
        dataItemId: "activeContactId",
      },
    },
    childrenKeys: ["contactDetails", "disableButton"],
  },
  contactDetails: {
    component: "block-plain",
    childrenKeys: ["contactDetailsEmail", "contactDetailsName"],
  },
  contactDetailsEmail: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "email",
      },
    },
  },
  contactDetailsName: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "firstName",
      },
    },
  },
  disableButton: {
    component: "button-primary",
    config: {
      text: "Hide details",
      actions: [
        {
          type: "form-set-field",
          key: "activeContactId",
          value: undefined,
        },
      ],
    },
  },
}

export default view
