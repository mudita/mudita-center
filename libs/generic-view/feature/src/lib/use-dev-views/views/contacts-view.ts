/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { View } from "generic-view/utils"

// @ts-ignore
const view: View = {
  contactsForm: {
    component: "form",
    config: {
      formOptions: {
        defaultValues: {
          selectedContacts: [],
          allContacts: [],
        },
      },
      defaultFields: {
        selectedContacts: [],
        allContacts: [],
        activeContactId: undefined,
      },
    },
    childrenKeys: ["contactsLoader"],
  },
  detailsWrapper: {
    component: "conditional-renderer",
    dataProvider: {
      source: "form-fields-v2",
      formName: "contactsForm",
      fields: [
        {
          providerField: "activeContactId",
          componentField: "data.render",
          modifier: "boolean",
        },
      ],
    },
    childrenKeys: ["details"],
  },
  details: {
    component: "block-box",
    config: {
      title: "Contact",
    },
    dataProvider: {
      source: "form-fields-v2",
      formName: "contactsForm",
      fields: [
        {
          providerField: "activeContactId",
          componentField: "dataItemId",
        },
      ],
    },
    childrenKeys: ["contactDetails", "disableButton"],
  },
  disableButton: {
    component: "button-primary",
    config: {
      text: "Hide details",
      actions: [
        {
          type: "form-reset-v2",
          fieldKey: "activeContactId",
          formName: "contactsForm",
        },
      ],
    },
  },
  contactsPanelDefaultMode: {
    component: "conditional-renderer",
    dataProvider: {
      source: "form-fields-v2",
      formName: "contactsForm",
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
  contactsPanelSelectMode: {
    component: "conditional-renderer",
    dataProvider: {
      source: "form-fields-v2",
      formName: "contactsForm",
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
  selectAllCheckbox: {
    component: "form.checkboxInput",
    config: {
      name: "selectedContacts",
      formName: "contactsForm",
      size: "small",
    },
    dataProvider: {
      source: "form-fields-v2",
      formName: "contactsForm",
      fields: [
        {
          providerField: "allContacts",
          componentField: "config.multipleValues",
        },
      ],
    },
  },
  selectedContactsCounterText: {
    component: "format-message",
    config: {
      messageTemplate:
        "{selectedContacts} {selectedContacts, plural, one {contact} other {contacts}} selected",
    },
    dataProvider: {
      source: "form-fields-v2",
      formName: "contactsForm",
      fields: [
        {
          modifier: "length",
          providerField: "selectedContacts",
          componentField: "data.fields.selectedContacts",
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
      form: {
        formName: "contactsForm",
        assignFields: {
          selectedIdsFieldName: "selectedContacts",
          allIdsFieldName: "allContacts",
          activeIdFieldName: "activeContactId",
        },
      },
    },
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
    childrenKeys: [
      "columnCheckbox",
      "columnName",
      "columnPhoneNumberOptional",
      "columnPhoneNumberLengthOptional",
    ],
  },
  contactCheckbox: {
    component: "form.checkboxInput",
    config: {
      name: "selectedContacts",
      size: "small",
      formName: "contactsForm",
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
  deleteModalTitleText: {
    component: "format-message",
    config: {
      messageTemplate:
        "Delete {selectedContacts, plural, one {contact} other {# contacts}}?",
    },
    dataProvider: {
      source: "form-fields-v2",
      formName: "contactsForm",
      fields: [
        {
          modifier: "length",
          providerField: "selectedContacts",
          componentField: "data.fields.selectedContacts",
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
      source: "form-fields-v2",
      formName: "contactsForm",
      fields: [
        {
          modifier: "length",
          providerField: "selectedContacts",
          componentField: "data.fields.selectedContacts",
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
          domain: "contacts-delete",
          modalKey: "deleteProgressModal",
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
    layout: {
      flexLayout: {
        direction: "row",
        justifyContent: "center",
      },
    },
    dataProvider: {
      source: "form-fields-v2",
      formName: "contactsForm",
      fields: [
        {
          providerField: "selectedContacts",
          componentField: "config.actions[1].ids",
        },
        {
          providerField: "selectedContacts",
          componentField: "config.actions[1].postActions.success[0].value",
          modifier: "length",
        },
      ],
    },
    childrenKeys: ["deleteModalConfirmButtonText"],
  },
  contactsDeletedToastMessage: {
    component: "format-message",
    config: {
      messageTemplate:
        "{selectedContacts} {selectedContacts, plural, one {contact} other {contacts}} deleted",
    },
    dataProvider: {
      source: "form-fields-v2",
      formName: "contactsForm",
      disableWatching: true,
      fields: [
        {
          modifier: "length",
          providerField: "selectedContacts",
          componentField: "data.fields.selectedContacts",
        },
      ],
    },
  },
  contactsSearchInput: {
    component: "form.searchInput",
    config: {
      name: "searchedContact",
      label: "Search all contacts",
      formName: "contactsForm",
    },
  },
}

export default view
