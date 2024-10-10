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
      defaultValues: {
        selectedContacts: [],
        allContacts: [],
        activeContact: undefined,
      },
    },
    childrenKeys: ["contactsLoader"],
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
  contactsDeletedToastMessage: {
    component: "format-message",
    config: {
      messageTemplate:
        "{selectedContacts} {selectedContacts, plural, one {contact} other {contacts}} deleted",
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
}

export default view
