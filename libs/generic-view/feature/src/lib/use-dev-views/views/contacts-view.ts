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
        activeIdFieldName: "activeContactId",
      },
    },
    layout: {
      flexPlacement: {
        grow: 1,
      },
    },
    dataProvider: {
      source: "entities-array",
      entitiesType: "contacts",
      sort: [
        {
          fieldGroup: [
            "lastName",
            "firstName",
            "displayName1",
            "displayName2",
            "displayName3",
            "displayName4",
          ],
          priority: 1,
          direction: "asc",
          orderingPatterns: [
            "/^\\p{L}.*/u",
            "/^\\d+$/",
            "/^[^a-zA-Z\\d\\s@]+$/",
          ],
        },
      ],
    },
    childrenKeys: [
      "columnCheckbox",
      "columnNameSmallWrapper",
      "columnNameBigWrapper",
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
  columnNameSmallWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "form-fields",
      fields: [
        {
          providerField: "activeContactId",
          componentField: "data.render",
          modifier: "boolean",
        },
      ],
    },
    childrenKeys: ["columnNameSmall"],
  },
  columnNameSmall: {
    component: "table.cell",
    config: {
      width: "260px",
    },
    childrenKeys: ["contactDisplayName"],
  },
  columnNameBigWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "form-fields",
      fields: [
        {
          providerField: "activeContactId",
          componentField: "data.render",
          modifier: "boolean",
          condition: "eq",
          value: false,
        },
      ],
    },
    childrenKeys: ["columnNameBig"],
  },
  columnNameBig: {
    component: "table.cell",
    config: {
      width: "479px",
    },
    childrenKeys: ["contactDisplayName"],
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
    config: {
      borderLeft: "1px solid #d2d6db",
    },
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
    component: "block-plain",
    config: {
      borderBottom: "2px solid #f4f5f6",
      borderTop: "1px solid #d2d6db",
    },
    childrenKeys: ["contactDisplayNameHeader", "disableButton"],
    layout: {
      flexLayout: {
        columnGap: "14px",
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
      padding: "24px 32px",
    },
  },
  contactDisplayNameHeader: {
    component: "h3-component",
    config: {
      text: "",
      unbold: true,
      singleLine: true,
    },
    childrenKeys: ["contactDisplayNameValue"],
  },
  disableButton: {
    component: "button-icon",
    config: {
      icon: IconType.Close,
      iconSize: "tiny",
      actions: [
        {
          type: "form-set-field",
          key: "activeContactId",
        },
      ],
    },
  },
  contactDetails: {
    component: "block-plain",
    layout: {
      flexLayout: {
        rowGap: "18px",
        direction: "column",
      },
      padding: "24px 32px 32px 32px",
      height: "557px",
      overflow: "auto",
    },
    childrenKeys: [
      "contactInformationText",
      "contactDetailsPhoneNumberWrapper",
      "contactDetailsFirstNameWrapper",
      "contactDetailsLastNameWrapper",
      "contactDetailsNamePrefixWrapper",
      "contactDetailsMiddleNameWrapper",
      "contactDetailsNameSuffixWrapper",
      "contactDetailsEmailWrapper",
      "contactDetailsNickNameWrapper",
      "contactDetailsCompanyWrapper",
      "contactDetailsDepartmentWrapper",
      "contactDetailsTitleWrapper",
      "contactDetailsSipWrapper",
      "contactDetailsAddressWrapper",
      "contactDetailsWebsiteWrapper",
      "contactDetailsNotesWrapper",
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
      "contactDetailsPhoneNumber2Wrapper",
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
  contactDetailsPhoneNumber2Wrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "phoneNumbers[1].phoneNumber",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsPhoneNumber2Block"],
  },
  contactDetailsPhoneNumber2Block: {
    component: "block-plain",
    layout: {
      flexLayout: {
        direction: "row",
        columnGap: "6px",
        alignItems: "flex-start",
      },
    },
    childrenKeys: [
      "contactDetailsPhoneNumber2Value",
      "contactDetailsPhoneNumber2Type",
    ],
  },
  contactDetailsPhoneNumber2Value: {
    component: "p4-component",
    config: {
      color: "black",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "phoneNumbers[1].phoneNumber",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsPhoneNumber2Type: {
    component: "p4-component",
    config: {
      color: "black",
    },
    childrenKeys: ["contactDetailsPhoneNumber2TypeText"],
  },
  contactDetailsPhoneNumber2TypeText: {
    component: "format-message",
    config: {
      messageTemplate: "• <c>{phoneType}</c>",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "phoneNumbers[1].phoneType",
          componentField: "data.fields.phoneType",
        },
      ],
    },
  },
  contactDetailsFirstNameWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "firstName",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsFirstName"],
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
    component: "p4-component",
    config: {
      color: "black",
    },
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
  contactDetailsLastNameWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "lastName",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsLastName"],
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
    component: "p4-component",
    config: {
      color: "black",
    },
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
  contactDetailsNamePrefixWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "namePrefix",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsNamePrefix"],
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
    component: "p4-component",
    config: {
      color: "black",
    },
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
    component: "p4-component",
    config: {
      color: "black",
    },
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
  contactDetailsNameSuffixWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "nameSuffix",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsNameSuffix"],
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
    component: "p4-component",
    config: {
      color: "black",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "nameSuffix",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsEmailWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "emailAddresses[0].emailAddress",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsEmail"],
  },
  contactDetailsEmail: {
    component: "block-plain",
    childrenKeys: ["contactDetailsEmailLabel", "contactDetailsEmailValue"],
  },
  contactDetailsEmailLabel: {
    component: "h5-component",
    config: {
      text: "Email",
    },
    childrenKeys: ["contactDetailsEmailLabelText"],
  },
  contactDetailsEmailLabelText: {
    component: "format-message",
    config: {
      messageTemplate: "Email (<c>{type}</c>)",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "emailAddresses[0].emailType",
          componentField: "data.fields.type",
        },
      ],
    },
  },
  contactDetailsEmailValue: {
    component: "p4-component",
    config: {
      color: "black",
    },
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
  contactDetailsNickNameWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "nickName",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsNickName"],
  },
  contactDetailsNickName: {
    component: "block-plain",
    childrenKeys: [
      "contactDetailsNickNameLabel",
      "contactDetailsNickNameValue",
    ],
  },
  contactDetailsNickNameLabel: {
    component: "h5-component",
    config: {
      text: "Nickname",
    },
  },
  contactDetailsNickNameValue: {
    component: "p4-component",
    config: {
      color: "black",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "nickName",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsCompanyWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "company",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsCompany"],
  },
  contactDetailsCompany: {
    component: "block-plain",
    childrenKeys: ["contactDetailsCompanyLabel", "contactDetailsCompanyValue"],
  },
  contactDetailsCompanyLabel: {
    component: "h5-component",
    config: {
      text: "Company",
    },
  },
  contactDetailsCompanyValue: {
    component: "p4-component",
    config: {
      color: "black",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "company",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsDepartmentWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "department",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsDepartment"],
  },
  contactDetailsDepartment: {
    component: "block-plain",
    childrenKeys: [
      "contactDetailsDepartmentLabel",
      "contactDetailsDepartmentValue",
    ],
  },
  contactDetailsDepartmentLabel: {
    component: "h5-component",
    config: {
      text: "Department",
    },
  },
  contactDetailsDepartmentValue: {
    component: "p4-component",
    config: {
      color: "black",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "department",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsTitleWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "workTitle",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsTitle"],
  },
  contactDetailsTitle: {
    component: "block-plain",
    childrenKeys: ["contactDetailsTitleLabel", "contactDetailsTitleValue"],
  },
  contactDetailsTitleLabel: {
    component: "h5-component",
    config: {
      text: "Title",
    },
  },
  contactDetailsTitleValue: {
    component: "p4-component",
    config: {
      color: "black",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "workTitle",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsSipWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "sip",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsSip"],
  },
  contactDetailsSip: {
    component: "block-plain",
    childrenKeys: ["contactDetailsSipLabel", "contactDetailsSipValue"],
  },
  contactDetailsSipLabel: {
    component: "h5-component",
    config: {
      text: "SIP",
    },
  },
  contactDetailsSipValue: {
    component: "p4-component",
    config: {
      color: "black",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "sip",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsAddressWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "address.type",
          componentField: "data.render",
          modifier: "boolean",
          condition: "eq",
          value: true,
        },
      ],
    },
    childrenKeys: ["contactDetailsAddress"],
  },
  contactDetailsAddress: {
    component: "block-plain",
    childrenKeys: [
      "contactDetailsAddressLabel",
      "contactDetailsAddressStreetWrapper",
      "contactDetailsAddressCityWrapper",
      "contactDetailsAddressCountryWrapper",
    ],
  },
  contactDetailsAddressLabel: {
    component: "h5-component",
    config: {
      text: "Address",
    },
    childrenKeys: ["contactDetailsAddressLabelText"],
  },
  contactDetailsAddressLabelText: {
    component: "format-message",
    config: {
      messageTemplate: "Address (<c>{type}</c>)",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "address.type",
          componentField: "data.fields.type",
        },
      ],
    },
  },
  contactDetailsAddressStreetWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "address.streetAddress",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsAddressStreetValue"],
  },
  contactDetailsAddressStreetValue: {
    component: "p4-component",
    config: {
      color: "black",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "address.streetAddress",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsAddressCityWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "address.city",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsAddressCity"],
  },
  contactDetailsAddressCity: {
    component: "p4-component",
    config: {
      color: "black",
    },
    childrenKeys: ["contactDetailsAddressCityValue"],
  },
  contactDetailsAddressCityValue: {
    component: "format-message",
    config: {
      messageTemplate: "{city} {zipCode}",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "address.city",
          componentField: "data.fields.city",
        },
        {
          providerField: "address.zipCode",
          componentField: "data.fields.zipCode",
        },
      ],
    },
  },
  contactDetailsAddressCountryWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "address.country",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsAddressCountryValue"],
  },
  contactDetailsAddressCountryValue: {
    component: "p4-component",
    config: {
      color: "black",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "address.country",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsWebsiteWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "website",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsWebsite"],
  },
  contactDetailsWebsite: {
    component: "block-plain",
    childrenKeys: ["contactDetailsWebsiteLabel", "contactDetailsWebsiteValue"],
  },
  contactDetailsWebsiteLabel: {
    component: "h5-component",
    config: {
      text: "Website",
    },
  },
  contactDetailsWebsiteValue: {
    component: "p4-component",
    config: {
      color: "black",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "website",
          componentField: "config.text",
        },
      ],
    },
  },
  contactDetailsNotesWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "notes",
          componentField: "data.render",
          condition: "ne",
          value: undefined,
        },
      ],
    },
    childrenKeys: ["contactDetailsNotes"],
  },
  contactDetailsNotes: {
    component: "block-plain",
    childrenKeys: ["contactDetailsNotesLabel", "contactDetailsNotesValue"],
  },
  contactDetailsNotesLabel: {
    component: "h5-component",
    layout: {
      margin: "16px 0 0 0",
    },
    config: {
      text: "Notes",
    },
  },
  contactDetailsNotesValue: {
    component: "p4-component",
    config: {
      color: "black",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "notes",
          componentField: "config.text",
        },
      ],
    },
  },
}

export default view
