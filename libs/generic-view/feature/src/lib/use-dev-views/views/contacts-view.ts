/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType, View } from "generic-view/utils"

const view: View = {
  main: {
    // @ts-ignore
    screenTitle: "Contacts",
    component: "block-plain",
    layout: {
      gridLayout: {
        rows: ["auto", "1fr"],
        columns: ["1fr"],
      },
    },
    config: {
      backgroundColor: "white",
    },
    childrenKeys: ["contactsForm"],
  },
  contactsForm: {
    component: "form",
    config: {
      formOptions: {
        defaultValues: {
          searchedContact: undefined,
          activeContactId: undefined,
          selectedContacts: [],
          allContacts: [],
        },
      },
    },
    childrenKeys: ["contactsLoader"],
  },
  contactsLoader: {
    component: "entities-loader",
    config: {
      entitiesTypes: ["contacts"],
    },
    childrenKeys: ["contactsPanel", "contactsFormWrapper"],
  },
  contactsPanel: {
    component: "block-plain",
    childrenKeys: ["contactsPanelDefaultMode", "contactsPanelSelectMode"],
  },
  contactsPanelDefaultMode: {
    component: "conditional-renderer",
    dataProvider: {
      source: "form-fields",
      fields: {
        "data.render": {
          field: "selectedContacts",
          modifier: "length",
          condition: "eq",
          value: 0,
        },
      },
    },
    childrenKeys: ["contactsPanelManager"],
  },
  contactsPanelManager: {
    component: "block-plain",
    childrenKeys: ["contactsSearchInput", "contactsButtonActions"],
    layout: {
      margin: "32px",
      gridLayout: {
        rows: [],
        columns: ["280px", "336px"],
        justifyContent: "space-between",
      },
    },
  },
  contactsSearchInput: {
    component: "form.searchInput",
    config: {
      label: "Search all contacts",
      name: "searchedContact",
    },
  },
  contactsButtonActions: {
    component: "block-plain",
    layout: {
      gridLayout: {
        columns: ["1fr", "1fr"],
        rows: [],
        columnGap: "24px",
      },
    },
    childrenKeys: ["createContactsButton", "importContactsButton"],
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
  contactsPanelSelectMode: {
    component: "conditional-renderer",
    dataProvider: {
      source: "form-fields",
      fields: {
        "data.render": {
          field: "selectedContacts",
          modifier: "length",
          condition: "gt",
          value: 0,
        },
      },
    },
    childrenKeys: ["contactsPanelSelector"],
  },
  contactsPanelSelector: {
    component: "selection-manager",
    layout: {
      margin: "32px",
      padding: "8px 24px 8px 12px",
      gridLayout: {
        rows: ["auto"],
        columns: ["auto", "1fr", "auto"],
        alignItems: "center",
        columnGap: "14px",
      },
    },
    childrenKeys: [
      "selectAllCheckbox",
      "selectedContactsCounter",
      "deleteButton",
    ],
  },
  selectAllCheckbox: {
    component: "form.checkboxInput",
    dataProvider: {
      source: "form-fields",
      fields: {
        "config.multipleValues": "allContacts",
      },
    },
    config: {
      name: "selectedContacts",
      size: "small",
    },
  },
  selectedContactsCounter: {
    component: "p4-component",
    childrenKeys: ["selectedContactsCounterText"],
  },
  selectedContactsCounterText: {
    component: "format-message",
    dataProvider: {
      source: "form-fields",
      fields: {
        "data.fields.selectedContacts": {
          field: "selectedContacts",
          modifier: "length",
        },
      },
    },
    config: {
      messageTemplate:
        "{selectedContacts} {selectedContacts, plural, one {contact} other {contacts}} selected",
    },
  },
  deleteButton: {
    component: "button-text",
    config: {
      text: "Delete",
      icon: IconType.Delete,
      modifiers: ["uppercase"],
      actions: [
        {
          type: "open-modal",
          modalKey: "deleteModal",
          domain: "contacts-delete",
        },
      ],
    },
  },
  deleteModal: {
    component: "modal",
    config: {
      size: "small",
    },
    childrenKeys: [
      "deleteModalIcon",
      "deleteModalTitle",
      "deleteModalContent",
      "deleteModalButtons",
    ],
  },
  deleteModalIcon: {
    component: "modal.titleIcon",
    config: {
      type: IconType.Exclamation,
    },
  },
  deleteModalTitle: {
    component: "modal.title",
    config: {
      text: "Delete contacts",
    },
  },
  deleteModalContent: {
    component: "p1-component",
    config: {
      text: "Are you sure you want to delete selected contacts?",
    },
  },
  deleteModalButtons: {
    component: "modal.buttons",
    childrenKeys: ["deleteModalCancelButton", "deleteModalConfirmButton"],
  },
  deleteModalCancelButton: {
    component: "button-secondary",
    config: {
      text: "Cancel",
      actions: [
        {
          type: "close-modal",
          modalKey: "deleteModal",
        },
      ],
    },
  },
  deleteModalConfirmButton: {
    component: "button-primary",
    dataProvider: {
      source: "form-fields",
      formKey: "contactsForm",
      fields: {
        "config.actions[1].ids": "selectedContacts",
      },
    },
    layout: {
      flexLayout: {
        direction: "row",
        justifyContent: "center",
      },
    },
    config: {
      actions: [
        {
          type: "open-modal",
          modalKey: "deleteProgressModal",
          domain: "contacts-delete",
        },
        {
          type: "entities-delete",
          entitiesType: "contacts",
          ids: [],
          postActions: {
            success: [
              {
                type: "close-domain-modals",
                domain: "contacts-delete",
              },
              {
                type: "open-toast",
                toastKey: "contactsDeletedToast",
              },
            ],
          },
        },
      ],
    },
    childrenKeys: ["deleteModalConfirmButtonText"],
  },
  deleteModalConfirmButtonText: {
    component: "format-message",
    dataProvider: {
      source: "form-fields",
      formKey: "contactsForm",
      fields: {
        "data.fields.selectedContacts": {
          field: "selectedContacts",
          modifier: "length",
        },
      },
    },
    config: {
      messageTemplate: "Delete contacts ({selectedContacts})",
    },
  },
  deleteProgressModal: {
    component: "modal",
    config: {
      size: "small",
    },
    childrenKeys: ["deleteProgressModalIcon", "deleteProgressModalTitle"],
  },
  deleteProgressModalIcon: {
    component: "modal.titleIcon",
    config: {
      type: IconType.SpinnerDark,
    },
  },
  deleteProgressModalTitle: {
    component: "modal.title",
    config: {
      text: "Deleting, please wait...",
    },
  },
  contactsDeletedToast: {
    component: "toast",
    childrenKeys: ["contactsDeletedToastIcon", "contactsDeletedToastText"],
  },
  contactsDeletedToastIcon: {
    component: "icon",
    config: {
      type: IconType.Success,
    },
  },
  contactsDeletedToastText: {
    component: "p1-component",
    childrenKeys: ["contactsDeletedToastMessage"],
  },
  contactsDeletedToastMessage: {
    component: "format-message",
    dataProvider: {
      source: "form-fields",
      formKey: "contactsForm",
      fields: {
        "data.fields.selectedContacts": {
          field: "selectedContacts",
          modifier: "length",
        },
      },
    },
    config: {
      messageTemplate:
        "{selectedContacts} {selectedContacts, plural, one {contact} other {contacts}} deleted",
    },
  },
  contactsFormWrapper: {
    component: "block-plain",
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
    },
    config: {
      formOptions: {
        activeIdFieldName: "activeContactId",
        selectedIdsFieldName: "selectedContacts",
        allIdsFieldName: "allContacts",
      },
    },
    childrenKeys: [
      "columnCheckbox",
      "columnName",
      "columnPhoneNumberOptional",
      "columnPhoneNumberLengthOptional",
    ],
  },
  columnCheckbox: {
    component: "table.cell",
    config: {
      width: 70,
    },
    layout: {
      padding: "0 0 0 32px",
    },
    childrenKeys: ["contactCheckbox"],
  },
  contactCheckbox: {
    component: "form.checkboxInput",
    config: {
      name: "selectedContacts",
      size: "small",
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
      width: 717,
    },
    childrenKeys: ["contactFieldsRenderer"],
  },
  contactFieldsRenderer: {
    component: "item-filter",
    config: {
      variant: "FirstNonEmpty",
    },
    childrenKeys: [
      "contactFirstNamePrefixText",
      "contactFirstNameText",
      "contactLastNameText",
      "contactMiddleNameText",
      "contactNameSuffixText",
      "contactPhoneNumberText",
      "contactEmailAddressText",
      "contactNickNameText",
      "contactCompanyText",
      "contactDepartmentText",
      "contactWorkTitleText",
      "contactAddressStreetText",
      "contactAddressCityText",
      "contactAddressCountryText",
      "contactWebsiteText",
      "contactNotesText",
    ],
  },
  contactFirstNamePrefixText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "namePrefix",
      },
    },
  },
  contactFirstNameText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "firstName",
      },
    },
  },
  contactLastNameText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "lastName",
      },
    },
  },
  contactMiddleNameText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "middleName",
      },
    },
  },
  contactNameSuffixText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "nameSuffix",
      },
    },
  },
  contactPhoneNumberText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "phoneNumbers[0].phoneNumber",
      },
    },
  },
  contactEmailAddressText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "emailAddresses[0].emailAddress",
      },
    },
  },
  contactNickNameText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "nickName",
      },
    },
  },
  contactCompanyText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "company",
      },
    },
  },
  contactDepartmentText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "department",
      },
    },
  },
  contactWorkTitleText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "workTitle",
      },
    },
  },
  contactAddressStreetText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "address.streetAddress",
      },
    },
  },
  contactAddressCityText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "address.city",
      },
    },
  },
  contactAddressCountryText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "address.country",
      },
    },
  },
  contactWebsiteText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "website",
      },
    },
  },
  contactNotesText: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "notes",
      },
    },
  },

  columnPhoneNumberOptional: {
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
      width: 135,
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
  columnPhoneNumberLengthOptional: {
    component: "form.conditionalRenderer",
    config: {
      formFieldName: "activeContactId",
      renderIfFalse: true,
    },
    childrenKeys: ["columnPhoneNumberLength"],
  },
  columnPhoneNumberLength: {
    component: "table.cell",
    config: {
      width: 40,
    },
    childrenKeys: ["phoneNumberLength"],
  },
  phoneNumberLength: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: {
        "data.text": "phoneNumbers.length",
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