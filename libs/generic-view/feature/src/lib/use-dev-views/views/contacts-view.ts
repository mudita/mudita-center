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
      defaultValues: {
        searchedContact: undefined,
        activeContactId: undefined,
        selectedContacts: [],
        allContacts: [],
      },
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
    childrenKeys: ["contactsPanelWrapper", "contactsFormWrapper", "emptyListWrapper"],
  },
  emptyListWrapper: {
    component: "conditional-renderer",
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
    childrenKeys: ["fullScreenWrapper"],
  },
  fullScreenWrapper: {
    component: "block-plain",
    layout: {
      gridPlacement: {
        row: 1,
        column: 1,
        width: 1,
        height: 2,
      },
      flexLayout: {
        rowGap: "24px",
        direction: "column",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    // importContactsButton already comes from the device through API
    childrenKeys: ["emptyStateIcon", "emptyStateText", "importContactsButton"],
  },
  emptyStateIcon: {
    component: "modal.titleIcon",
    config: {
      type: IconType.ContactsBook,
    },
  },
  emptyStateText: {
    component: "block-plain",
    layout: {
      flexLayout: {
        direction: "column",
        alignItems: "center",
        rowGap: "8px",
      },
    },
    childrenKeys: ["title", "detailText"],
  },
  contactsPanelWrapper: {
    component: "conditional-renderer",
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
    childrenKeys: ["contactsPanel"],
  },
  contactsPanel: {
    component: "block-plain",
    layout: {
      gridPlacement: {
        row: 1,
        column: 1,
        width: 1,
        height: 1,
      },
    },
    childrenKeys: ["contactsPanelDefaultMode", "contactsPanelSelectMode"],
  },
  contactsPanelDefaultMode: {
    component: "conditional-renderer",
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
      fields: [
        {
          providerField: "allContacts",
          componentField: "config.multipleValues",
        },
      ],
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
      fields: [
        {
          providerField: "selectedContacts",
          componentField: "data.fields.selectedContacts",
          modifier: "length",
        },
      ],
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
      fields: [
        {
          providerField: "selectedContacts",
          componentField: "config.actions[1].ids",
        },
      ],
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
      fields: [
        {
          providerField: "selectedContacts",
          componentField: "data.fields.selectedContacts",
          modifier: "length",
        },
      ],
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
      fields: [
        {
          providerField: "selectedContacts",
          componentField: "data.fields.selectedContacts",
          modifier: "length",
        },
      ],
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
      sort: [
        {
          providerField: "lastName",
          priority: 1,
          direction: "asc",
          orderingPatterns: ["/^\\p{L}/miu", "/^\\d/m", "/^\\#/m"],
        },
        {
          providerField: "firstName",
          priority: 2,
          direction: "asc",
        },
        {
          providerField: "displayName",
          priority: 3,
          direction: "asc",
        },
      ],
    },
    config: {
      formOptions: {
        activeIdFieldName: "activeContactId",
        selectedIdsFieldName: "selectedContacts",
        allIdsFieldName: "allContacts",
      },
      form: {
        formName: "contactsForm",
        assignFields: {
          activeIdFieldName: "activeContactId",
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
      },
    },
  },
  columnName: {
    component: "table.cell",
    config: {
      width: 717,
    },
    childrenKeys: ["contactDisplayNameText"],
  },
  contactDisplayNameText: {
    component: "text-plain",
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
      fields: [
        {
          providerField: "phoneNumbers[0].phoneNumber",
          componentField: "data.text",
        },
      ],
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
    childrenKeys: ["phoneDropdownCounter"],
  },
  phoneDropdownCounter: {
    component: "conditional-renderer",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          providerField: "phoneNumbers",
          componentField: "data.render",
          modifier: "length",
          slice: [1],
          condition: "gt",
          value: 0,
        },
      ],
    },
    childrenKeys: ["phoneDropdownCounterBadge"],
  },
  phoneDropdownCounterBadge: {
    component: "badge",
    childrenKeys: ["phoneDropdownCounterBadgeText"],
  },
  phoneDropdownCounterBadgeText: {
    component: "format-message",
    dataProvider: {
      source: "entities-field",
      entitiesType: "contacts",
      fields: [
        {
          componentField: "data.fields.phoneNumbersLength",
          providerField: "phoneNumbers",
          modifier: "length",
          slice: [1],
        },
        {
          componentField: "extra-data.tooltip.contentList",
          providerField: "phoneNumbers",
          slice: [1],
          flat: "phoneNumber",
        },
      ],
    },
    config: {
      messageTemplate: "+{phoneNumbersLength}",
    },
    extra: {
      tooltip: {
        placement: "bottom-left",
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
      fields: [
        {
          providerField: "activeContactId",
          componentField: "dataItemId",
        },
      ],
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
          value: undefined,
        },
      ],
    },
  },
}

export default view
