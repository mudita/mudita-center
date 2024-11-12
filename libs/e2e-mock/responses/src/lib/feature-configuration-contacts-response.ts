/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const featureConfigurationContactsResponse = {
  main: {
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
      text: "Loading contacts, please wait...",
      entitiesTypes: ["contacts"],
    },
    childrenKeys: [
      "contactsPanelWrapper",
      "contactsFormWrapper",
      "emptyListWrapper",
      "appHeaderCounter",
    ],
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
  },
  contactsPanel: {
    component: "block-plain",
    childrenKeys: ["contactsPanelDefaultMode", "contactsPanelSelectMode"],
    layout: {
      gridPlacement: {
        row: 1,
        column: 1,
        width: 1,
        height: 1,
      },
    },
  },
  contactsPanelDefaultMode: {
    component: "conditional-renderer",
    childrenKeys: ["contactsPanelManager"],
    dataProvider: {
      source: "form-fields",
      fields: [
        {
          providerField: "selectedContacts",
          componentField: "data.render",
          modifier: "length",
          condition: "eq",
          value: 0,
        },
      ],
    },
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
    childrenKeys: ["createContactsButton", "importContactsButton"],
    layout: {
      gridLayout: {
        rows: [],
        columns: ["1fr", "1fr"],
        columnGap: "24px",
      },
    },
  },
  createContactsButton: {
    component: "button-secondary",
    config: {
      disabled: true,
      text: "add contact",
      actions: [],
    },
  },
  importContactsButton: {
    component: "mc-import-contacts-button",
    config: {
      text: "import contacts",
    },
  },
  contactsPanelSelectMode: {
    component: "conditional-renderer",
    childrenKeys: ["contactsPanelSelector"],
    dataProvider: {
      source: "form-fields",
      fields: [
        {
          providerField: "selectedContacts",
          componentField: "data.render",
          modifier: "length",
          condition: "gt",
          value: 0,
        },
      ],
    },
  },
  contactsPanelSelector: {
    component: "selection-manager",
    childrenKeys: [
      "selectAllCheckbox",
      "selectedContactsCounter",
      "deleteButton",
    ],
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
  },
  selectAllCheckbox: {
    component: "form.checkboxInput",
    config: {
      name: "selectedContacts",
      size: "small",
    },
    dataProvider: {
      source: "form-fields",
      fields: [
        {
          providerField: "allContacts",
          componentField: "config.multipleValues",
        },
      ],
    },
  },
  selectedContactsCounter: {
    component: "p4-component",
    childrenKeys: ["selectedContactsCounterText"],
  },
  selectedContactsCounterText: {
    component: "format-message",
    config: {
      messageTemplate:
        "{selectedContacts} {selectedContacts, plural, one {contact} other {contacts}} selected",
    },
    dataProvider: {
      source: "form-fields",
      fields: [
        {
          providerField: "selectedContacts",
          componentField: "data.fields.selectedContacts",
          modifier: "length",
        },
      ],
    },
  },
  deleteButton: {
    component: "button-text",
    config: {
      text: "Delete",
      icon: "delete",
      actions: [
        {
          type: "open-modal",
          modalKey: "deleteModal",
          domain: "contacts-delete",
        },
      ],
      modifiers: ["uppercase"],
    },
  },
  contactsDeletedToast: {
    component: "toast",
    childrenKeys: ["contactsDeletedToastIcon", "contactsDeletedToastText"],
  },
  contactsDeletedToastMessage: {
    component: "format-message",
    config: {
      messageTemplate:
        "{selectedContacts} {selectedContacts, plural, one {contact} other {contacts}} deleted",
    },
    dataProvider: {
      source: "form-fields",
      formKey: "contactsForm",
      fields: [
        {
          providerField: "selectedContacts",
          componentField: "data.fields.selectedContacts",
          modifier: "length",
        },
      ],
    },
  },
  contactsFormWrapper: {
    component: "block-plain",
    childrenKeys: ["contactsListTable", "detailsWrapper"],
    layout: {
      flexLayout: {
        direction: "row",
      },
    },
  },
  contactsListTable: {
    component: "table",
    config: {
      formOptions: {
        selectedIdsFieldName: "selectedContacts",
        allIdsFieldName: "allContacts",
      },
      form: {
        formName: "contactsForm",
        assignFields: {
          selectedIdsFieldName: "selectedContacts",
          allIdsFieldName: "allContacts",
        },
      },
    },
    childrenKeys: [
      "columnCheckbox",
      "columnName",
      "columnPhoneNumberOptional",
      "columnPhoneNumberLengthOptional",
    ],
    dataProvider: {
      source: "entities-array",
      entitiesType: "contacts",
      sort: [
        {
          providerField: "sortField",
          priority: 1,
          direction: "asc",
          orderingPatterns: ["/^\\p{L}/miu", "/^\\d/m", "/^\\#/m"],
        },
      ],
      filters: [],
    },
  },
  columnCheckbox: {
    component: "table.cell",
    config: {
      width: "74",
    },
    childrenKeys: ["contactCheckbox"],
    layout: {
      padding: "0 0 0 32px",
    },
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
      fields: [
        {
          providerField: "contactId",
          componentField: "config.value",
        },
      ],
    },
    extra: {
      tooltip: {
        contentText: "Select",
        offset: {
          x: 0,
          y: 6,
        },
      },
    },
  },
  columnName: {
    component: "table.cell",
    config: {
      width: "100%",
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
  columnPhoneNumberOptional: {
    component: "form.conditionalRenderer",
    config: {
      renderIfFalse: true,
      formFieldName: "activeContactId",
    },
    childrenKeys: ["columnPhoneNumber"],
  },
  columnPhoneNumber: {
    component: "table.cell",
    config: {
      width: "150",
    },
    childrenKeys: ["contactPhoneNumberWrapper"],
  },
  contactPhoneNumber: {
    component: "p1-component",
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
  columnPhoneNumberLengthOptional: {
    component: "form.conditionalRenderer",
    config: {
      renderIfFalse: true,
      formFieldName: "activeContactId",
    },
    childrenKeys: ["columnPhoneNumberLength"],
  },
  columnPhoneNumberLength: {
    component: "table.cell",
    config: {
      width: "58",
    },
    childrenKeys: ["phoneDropdownCounter"],
  },
  phoneDropdownCounter: {
    component: "conditional-renderer",
    childrenKeys: ["phoneDropdownCounterBadge"],
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "phoneNumbers",
          componentField: "data.render",
          modifier: "length",
          condition: "gt",
          value: 0,
          slice: [1],
        },
      ],
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
    childrenKeys: ["contactDetails", "disableButton"],
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
  contactDetails: {
    component: "block-plain",
    childrenKeys: ["contactDetailsEmail", "contactDetailsName"],
  },
  contactDetailsEmail: {
    component: "text-plain",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "email",
          componentField: "data.text",
        },
      ],
    },
  },
  contactDetailsName: {
    component: "text-plain",
    childrenKeys: [],
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "firstName",
          componentField: "data.text",
        },
      ],
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
      type: "exclamation",
    },
  },
  deleteModalTitle: {
    component: "modal.title",
    childrenKeys: ["deleteModalTitleText"],
  },
  deleteModalContent: {
    component: "p1-component",
    config: {
      text: "This can't be undone so please make a copy of any important information first.",
    },
  },
  contactsDeletedToastText: {
    component: "p1-component",
    childrenKeys: ["contactsDeletedToastMessage"],
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
    layout: {
      flexLayout: {
        direction: "row",
        justifyContent: "center",
      },
    },
    dataProvider: {
      source: "form-fields",
      formKey: "contactsForm",
      fields: [
        {
          providerField: "selectedContacts",
          componentField: "config.actions[1].ids",
        },
      ],
    },
  },
  deleteModalConfirmButtonText: {
    component: "format-message",
    config: {
      messageTemplate:
        "Delete {selectedContacts, plural, one {contact} other {contacts}}",
    },
    dataProvider: {
      source: "form-fields",
      formKey: "contactsForm",
      fields: [
        {
          providerField: "selectedContacts",
          componentField: "data.fields.selectedContacts",
          modifier: "length",
        },
      ],
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
      type: "spinner-dark",
    },
  },
  deleteProgressModalTitle: {
    component: "modal.title",
    config: {
      text: "Deleting, please wait...",
    },
  },
  contactsDeletedToastIcon: {
    component: "icon",
    config: {
      type: "success",
    },
  },
  phoneDropdownCounterBadge: {
    component: "button-text",
    config: {
      actions: [],
      modifiers: ["hover-background"],
    },
    childrenKeys: ["phoneDropdownCounterBadgeText"],
    layout: {
      padding: "2px 5px",
    },
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "phoneNumbers",
          componentField: "extra-data.tooltip.contentList",
          slice: [1],
          flat: "phoneNumber",
        },
      ],
    },
    extra: {
      tooltip: {
        placement: "bottom-left",
        offset: {
          x: 0,
          y: 6,
        },
      },
    },
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
          providerField: "phoneNumbers",
          componentField: "data.fields.phoneNumbersLength",
          modifier: "length",
          slice: [1],
        },
      ],
    },
  },
  contactsPanelWrapper: {
    component: "conditional-renderer",
    childrenKeys: ["contactsPanel"],
    dataProvider: {
      source: "form-fields-v2",
      formName: "contactsForm",
      fields: [
        {
          providerField: "allContacts",
          componentField: "data.render",
          modifier: "length",
          condition: "gt",
          value: 0,
        },
      ],
    },
  },
  emptyListWrapper: {
    component: "conditional-renderer",
    childrenKeys: ["fullScreenWrapper"],
    dataProvider: {
      source: "form-fields-v2",
      formName: "contactsForm",
      fields: [
        {
          providerField: "allContacts",
          componentField: "data.render",
          modifier: "length",
          condition: "eq",
          value: 0,
        },
      ],
    },
  },
  fullScreenWrapper: {
    component: "block-plain",
    childrenKeys: ["emptyStateIcon", "emptyStateText", "importContactsButton"],
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
  },
  emptyStateIcon: {
    component: "modal.titleIcon",
    config: {
      type: "contacts-book",
    },
  },
  emptyStateText: {
    component: "block-plain",
    childrenKeys: ["emptyStateTitle", "emptyStateDetailText"],
    layout: {
      flexLayout: {
        direction: "column",
        alignItems: "center",
        rowGap: "8px",
      },
    },
  },
  emptyStateTitle: {
    component: "h3-component",
    config: {
      text: "Import your contacts",
    },
  },
  emptyStateDetailText: {
    component: "p1-component",
    config: {
      text: "Import all your contacts from a single source.",
    },
  },
  contactDisplayNameValue: {
    component: "text-formatted",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "displayName",
          componentField: "data.text",
        },
      ],
    },
  },
  contactPhoneNumberWrapper: {
    component: "block-plain",
    childrenKeys: ["contactPhoneNumber"],
    layout: {
      padding: "0 12px 0 0",
      flexLayout: {
        direction: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      },
    },
  },
  deleteModalTitleText: {
    component: "format-message",
    config: {
      messageTemplate:
        "Delete {selectedContacts, plural, one {contact} other {# contacts}}?",
    },
    dataProvider: {
      source: "form-fields",
      formKey: "contactsForm",
      fields: [
        {
          providerField: "selectedContacts",
          componentField: "data.fields.selectedContacts",
          modifier: "length",
        },
      ],
    },
  },
  appHeaderCounter: {
    component: "app-portal",
    config: {
      portal: "app-header",
    },
    childrenKeys: ["appHeaderCounterText"],
  },
  appHeaderCounterText: {
    component: "format-message",
    config: {
      messageTemplate: "{contactsCount, plural, =0 {} other { (#)}}",
    },
    dataProvider: {
      source: "form-fields-v2",
      formName: "contactsForm",
      fields: [
        {
          providerField: "allContacts",
          componentField: "data.fields.contactsCount",
          modifier: "length",
        },
      ],
    },
  },
}
