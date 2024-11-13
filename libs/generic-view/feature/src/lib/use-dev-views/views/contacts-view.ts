/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { View } from "generic-view/utils"
import { IconType } from "generic-view/utils"

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
          activeContactId: null,
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
  columnName: {
    component: "table.cell",
    config: {
      width: "479px",
    },
    childrenKeys: ["contactDisplayName"],
  },
  contactDisplayName: {
    component: "p1-component",
    config: {
      color: "black",
    },
    childrenKeys: ["contactDisplayNameValue"],
  },
  detailsWrapper: {
    component: "form.conditionalRenderer",
    config: {
      formFieldName: "activeContactId",
    },
    childrenKeys: ["details"],
  },
  details: {
    component: "block-plain",
    layout: {
      width: "608px",
    },
    childrenKeys: ["contactDetailsHeader", "contactDetails"],
    dataProvider: {
      source: "form-fields",
      fields: [
        {
          providerField: "activeContactId",
          componentField: "dataItemId",
        },
      ],
    },
  },
  contactDetailsHeader: {
    component: "block-box",
    childrenKeys: ["contactDisplayNameHeader", "disableButton"],
    layout: {
      flexLayout: {
        rowGap: "24px",
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      gridPlacement: {
        row: 1,
        column: 1,
        width: 1,
        height: 2,
      },
    },
  },
  contactDisplayNameHeader: {
    component: "h3-component",
    config: {
      text: "",
      bold: false,
    },
    childrenKeys: ["contactDisplayNameValue"],
  },
  disableButton: {
    component: "button-icon",
    config: {
      icon: IconType.Close,
      actions: [
        {
          type: "form-set-field",
          key: "activeContactId",
        },
      ],
    },
  },
  contactDetails: {
    component: "block-box",
    layout: {
      flexLayout: {
        rowGap: "18px",
        direction: "column",
      },
    },
    childrenKeys: [
      "contactInformationText",
      "contactDetailsPhoneNumberWrapper",
      "contactDetailsFirstName",
      "contactDetailsLastName",
      "contactDetailsNamePrefix",
      "contactDetailsMiddleNameWrapper",
      "contactDetailsNameSuffix",
      "contactDetailsEmail",
    ],
  },
  contactInformationText: {
    component: "h4-component",
    layout: {
      margin: "0 0 16px 0",
    },
    config: {
      text: "Contact Information",
    },
  },
  contactDetailsPhoneNumberWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "phoneNumbers",
          modifier: "length",
          componentField: "data.render",
          condition: "gt",
          value: 0,
        },
      ],
    },
    childrenKeys: ["contactDetailsPhoneNumber"],
  },
  contactDetailsPhoneNumber: {
    component: "block-plain",
    childrenKeys: [
      "contactDetailsPhoneNumberLabel",
      "contactDetailsPhoneNumber1Wrapper",
      "contactDetailsPhoneNumber2",
    ],
  },
  contactDetailsPhoneNumberLabel: {
    component: "h5-component",
    config: {
      text: "Phone Number",
    },
  },
  contactDetailsPhoneNumber1Wrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "phoneNumbers[0].phoneNumber",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsPhoneNumber1Block"],
  },
  contactDetailsPhoneNumber1Block: {
    component: "block-plain",
    layout: {
      flexLayout: {
        direction: "row",
        columnGap: "6px",
        alignItems: "flex-start",
      },
    },
    childrenKeys: [
      "contactDetailsPhoneNumber1Value",
      "contactDetailsPhoneNumber1Type",
      "contactDetailsPhoneNumber1DefaultIcon",
    ],
  },
  contactDetailsPhoneNumber1Value: {
    component: "p4-component",
    config: {
      color: "black",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "phoneNumbers[0].phoneNumber",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsPhoneNumber1Type: {
    component: "p4-component",
    config: {
      color: "black",
    },
    childrenKeys: ["contactDetailsPhoneNumber1TypeText"],
  },
  contactDetailsPhoneNumber1TypeText: {
    component: "format-message",
    config: {
      messageTemplate: "• <c>{phoneType}</c>",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "phoneNumbers[0].phoneType",
          componentField: "data.fields.phoneType",
        },
      ],
    },
  },
  contactDetailsPhoneNumber1DefaultIcon: {
    component: "icon",
    config: {
      type: IconType.Success,
      color: "black",
      size: "small",
    },
  },
  contactDetailsFirstName: {
    component: "block-plain",
    childrenKeys: [
      "contactDetailsFirstNameLabel",
      "contactDetailsFirstNameValue",
    ],
  },
  contactDetailsFirstNameLabel: {
    component: "h5-component",
    config: {
      text: "First Name",
    },
  },
  contactDetailsFirstNameValue: {
    component: "p3-component",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "firstName",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsLastName: {
    component: "block-plain",
    childrenKeys: [
      "contactDetailsLastNameLabel",
      "contactDetailsLastNameValue",
    ],
  },
  contactDetailsLastNameLabel: {
    component: "h5-component",
    config: {
      text: "Last Name",
    },
  },
  contactDetailsLastNameValue: {
    component: "p3-component",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "lastName",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsNamePrefix: {
    component: "block-plain",
    childrenKeys: [
      "contactDetailsNamePrefixLabel",
      "contactDetailsNamePrefixValue",
    ],
  },
  contactDetailsNamePrefixLabel: {
    component: "h5-component",
    config: {
      text: "Name prefix",
    },
  },
  contactDetailsNamePrefixValue: {
    component: "p3-component",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "namePrefix",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsMiddleNameWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "middleName",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsMiddleName"],
  },
  contactDetailsMiddleName: {
    component: "block-plain",
    childrenKeys: [
      "contactDetailsMiddleNameLabel",
      "contactDetailsMiddleNameValue",
    ],
  },
  contactDetailsMiddleNameLabel: {
    component: "h5-component",
    config: {
      text: "Middle name",
    },
  },
  contactDetailsMiddleNameValue: {
    component: "p3-component",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "middleName",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsNameSuffix: {
    component: "block-plain",
    childrenKeys: [
      "contactDetailsNameSuffixLabel",
      "contactDetailsNameSuffixValue",
    ],
  },
  contactDetailsNameSuffixLabel: {
    component: "h5-component",
    config: {
      text: "Name suffix",
    },
  },
  contactDetailsNameSuffixValue: {
    component: "p3-component",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "namePrefix",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsEmail: {
    component: "block-plain",
    childrenKeys: ["contactDetailsEmailLabel", "contactDetailsEmailValue"],
  },
  contactDetailsEmailLabel: {
    component: "h5-component",
    config: {
      text: "Email (Home)",
    },
  },
  contactDetailsEmailValue: {
    component: "p3-component",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "emailAddresses[0].emailAddress",
          componentField: "config.text",
        },
      ],
    },
  },
}

export default view
