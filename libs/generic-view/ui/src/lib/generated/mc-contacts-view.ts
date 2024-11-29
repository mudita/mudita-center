/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { McContactsView } from "generic-view/models"

export const generateMcContactsView: ComponentGenerator<McContactsView> = (
  key,
  config
) => {
  return {
    [key]: {
      component: "block-plain",
      config: {
        backgroundColor: "white",
      },
      layout: {
        width: "100%",
        height: "100%",
        gridLayout: {
          rows: ["auto", "1fr"],
          columns: ["1fr"],
        },
      },
      childrenKeys: ["emptyListWrapper", "listWrapper"],
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
          searchedContact: "",
        },
      },
      childrenKeys: ["contactsLoader"],
    },
    contactsLoader: {
      component: "entities-loader",
      config: {
        entitiesTypes: [config.entityType],
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
      childrenKeys: [
        "contactsPanel",
        "contactsTableWrapper",
        "appHeaderCounter",
      ],
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
        formKey: "contactsForm",
      },
      childrenKeys: ["contactsSearchResults"],
    },
    contactsSearchResults: {
      component: "form.searchInputResults",
      config: {
        maxHeight: "242px",
      },
      dataProvider: {
        source: "entities-array",
        entitiesType: "contacts",
        search: {
          minPhraseLength: 1,
          separatePhraseWords: true,
          phraseSource: {
            type: "form-fields",
            formKey: "contactsForm",
            field: "searchedContact",
          },
          fields: [
            {
              field: "displayName1",
              mode: "startsWith",
            },
            {
              field: "displayName2",
              mode: "startsWith",
            },
            {
              field: "displayName3",
              mode: "startsWith",
            },
            {
              field: "displayName4",
              mode: "startsWith",
            },
            {
              field: "middleName",
              mode: "startsWith",
            },
            {
              field: "phoneNumbers[0].phoneNumber",
              mode: "includes",
            },
            {
              field: "phoneNumbers[1].phoneNumber",
              mode: "includes",
            },
            {
              field: "phoneNumbers[2].phoneNumber",
              mode: "includes",
            },
          ],
        },
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
      childrenKeys: ["contactsSearchResultItem"],
    },
    contactsSearchResultItem: {
      component: "button-plain",
      layout: {
        flexLayout: {
          direction: "column",
          justifyContent: "center",
        },
        padding: "8px 16px",
        height: "60px",
      },
      dataProvider: {
        source: "entities-field",
        entitiesType: "contacts",
        fields: [
          {
            providerField: "contactId",
            componentField: "config.actions[0].value",
          },
        ],
      },
      config: {
        actions: [
          {
            type: "form-set-field",
            key: "activeContactId",
            formKey: "contactsForm",
            value: undefined,
          },
          {
            type: "form-set-field",
            key: "searchedContact",
            formKey: "contactsForm",
            value: undefined,
          },
        ],
      },
      childrenKeys: ["contactsSearchResult"],
    },
    contactsSearchResult: {
      component: "mc-contacts-search-results",
      dataProvider: {
        source: "entities-field",
        entitiesType: "contacts",
        fields: [
          {
            providerField: "searchName",
            componentField: "data.firstLine",
          },
          {
            providerField: "phoneNumbers",
            componentField: "data.secondLine",
            flat: "phoneNumber",
          },
        ],
      },
      dataProviderSecondary: {
        source: "form-fields",
        formKey: "contactsForm",
        fields: [
          {
            providerField: "searchedContact",
            componentField: "data.highlightPhrase",
          },
        ],
      },
    },
    contactsSearchResultsItemPhoneNumber: {
      component: "p4-component",
      config: {
        color: "black",
      },
      childrenKeys: ["contactsSearchResultsItemPhoneNumberHighlight"],
    },
    contactsSearchResultsItemPhoneNumberHighlight: {
      component: "highlight-text",
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
      dataProviderSecondary: {
        source: "form-fields",
        formKey: "contactsForm",
        fields: [
          {
            providerField: "searchedContact",
            componentField: "data.phrase",
          },
        ],
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
        icon: IconType.Delete,
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
    contactsTableWrapper: {
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
    },
    contactDisplayName: {
      component: "p1-component",
      config: {
        color: "black",
      },
      childrenKeys: ["contactDisplayNameValue"],
    },
    columnPhoneNumberOptional: {
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
    detailsWrapper: {
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
    contactDetailsEmail: {
      component: "block-plain",
      childrenKeys: ["contactDetailsEmailLabel", "contactDetailsEmailValue"],
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
        type: IconType.SpinnerDark,
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
        type: IconType.Success,
      },
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
    fullScreenWrapper: {
      component: "block-plain",
      childrenKeys: [
        "emptyStateIcon",
        "emptyStateText",
        "importContactsButton",
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
    emptyStateIcon: {
      component: "modal.titleIcon",
      config: {
        type: IconType.ContactsBook,
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
      component: "format-message",
      config: {
        messageTemplate:
          "{displayName1} {displayName2} <b>{displayName3}</b> {displayName4}",
      },
      dataProvider: {
        source: "entities-field",
        entitiesType: "contacts",
        fields: [
          {
            providerField: "displayName1",
            componentField: "data.fields.displayName1",
          },
          {
            providerField: "displayName2",
            componentField: "data.fields.displayName2",
          },
          {
            providerField: "displayName3",
            componentField: "data.fields.displayName3",
          },
          {
            providerField: "displayName4",
            componentField: "data.fields.displayName4",
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
    columnEmpty: {
      component: "table.cell",
      config: {
        width: "100%",
      },
    },
    "importContactsButton-modal": {
      component: "modal",
      config: {
        size: "small",
        maxHeight: 659,
      },
      childrenKeys: ["importContactsButton-modal-content"],
    },
    "importContactsButton-modal-content": {
      component: "import-contacts",
      config: {
        modalKey: "importContactsButton-contacts",
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
    contactDetailsHeader: {
      component: "block-plain",
      config: {
        borderBottom: "2px solid #f4f5f6",
        borderTop: "1px solid #d2d6db",
      },
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
      childrenKeys: ["contactDisplayNameHeader", "disableButton"],
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
        "contactDetailsPhoneNumber1DefaultIconWrapper",
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
    contactDetailsPhoneNumber1DefaultIconWrapper: {
      component: "block-plain",
      childrenKeys: ["contactDetailsPhoneNumber1DefaultIconTooltip"],
    },
    contactDetailsPhoneNumber1DefaultIconTooltip: {
      component: "tooltip",
      config: {
        offset: {
          x: 15,
          y: 15,
        },
        placement: "bottom-right",
      },
      childrenKeys: [
        "contactDetailsPhoneNumber1DefaultIconTooltipAnchor",
        "contactDetailsPhoneNumber1DefaultIconTooltipContent",
      ],
    },
    contactDetailsPhoneNumber1DefaultIconTooltipAnchor: {
      component: "tooltip.anchor",
      childrenKeys: ["contactDetailsPhoneNumber1DefaultIcon"],
    },
    contactDetailsPhoneNumber1DefaultIconTooltipContent: {
      component: "tooltip.content",
      childrenKeys: [
        "contactDetailsPhoneNumber1DefaultIconTooltipContentTextWrapper",
      ],
    },
    contactDetailsPhoneNumber1DefaultIconTooltipContentTextWrapper: {
      component: "p5-component",
      config: {
        color: "grey1",
      },
      childrenKeys: ["contactDetailsPhoneNumber1DefaultIconTooltipContentText"],
    },
    contactDetailsPhoneNumber1DefaultIconTooltipContentText: {
      component: "format-message",
      config: {
        messageTemplate: "Calls and SMS will go to this number by default.",
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
          },
        ],
      },
      childrenKeys: ["contactDetailsEmail"],
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
          },
        ],
      },
      childrenKeys: ["contactDetailsCompany"],
    },
    contactDetailsCompany: {
      component: "block-plain",
      childrenKeys: [
        "contactDetailsCompanyLabel",
        "contactDetailsCompanyValue",
      ],
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
          },
        ],
      },
      childrenKeys: ["contactDetailsWebsite"],
    },
    contactDetailsWebsite: {
      component: "block-plain",
      childrenKeys: [
        "contactDetailsWebsiteLabel",
        "contactDetailsWebsiteValue",
      ],
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
}
