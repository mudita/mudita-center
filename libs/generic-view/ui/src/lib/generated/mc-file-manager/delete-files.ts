/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"

export const generateDeleteFiles: ComponentGenerator<{
  id: string
  entityType: string
}> = (key, { id, entityType }) => {
  return {
    [`deleteModal${key}${id}`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [
        `deleteModalIcon${key}${id}`,
        `deleteModalTitle${key}${id}`,
        `deleteModalContent${key}${id}`,
        `deleteModalButtons${key}${id}`,
      ],
    },
    [`deleteModalIcon${key}${id}`]: {
      component: "modal.titleIcon",
      config: {
        type: IconType.Exclamation,
      },
    },
    [`deleteModalTitle${key}${id}`]: {
      component: "modal.title",
      childrenKeys: [`deleteModalTitleText${key}${id}`],
    },
    [`deleteModalTitleText${key}${id}`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "Delete {selectedItems, plural, one {file} other {# files}}?",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `fileListForm${key}${id}`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`deleteModalContent${key}${id}`]: {
      component: "p1-component",
      childrenKeys: [`deleteModalContentText${key}${id}`],
    },
    [`deleteModalContentText${key}${id}`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "This will remove the {selectedItems, plural, one {file} other {files}} from Kompakt.",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `fileListForm${key}${id}`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`deleteModalButtons${key}${id}`]: {
      component: "modal.buttons",
      childrenKeys: [
        `deleteModalCancelButton${key}${id}`,
        `deleteModalConfirmButton${key}${id}`,
      ],
    },
    [`deleteModalCancelButton${key}${id}`]: {
      component: "button-secondary",
      config: {
        text: "Cancel",
        actions: [
          {
            type: "close-modal",
            modalKey: `deleteModal${key}${id}`,
          },
        ],
      },
    },
    [`deleteModalConfirmButton${key}${id}`]: {
      component: "button-primary",
      config: {
        actions: [
          {
            type: "open-modal",
            modalKey: `deleteProgressModal${key}${id}`,
            domain: "files-delete",
          },
          {
            type: "entities-delete",
            entitiesType: entityType,
            ids: [],
            postActions: {
              success: [
                {
                  type: "close-domain-modals",
                  domain: "files-delete",
                },
                {
                  type: "open-toast",
                  toastKey: `filesDeletedToast${key}${id}`,
                },
              ],
            },
          },
        ],
      },
      childrenKeys: [`deleteModalConfirmButtonText${key}${id}`],
      layout: {
        flexLayout: {
          direction: "row",
          justifyContent: "center",
        },
      },
      dataProvider: {
        source: "form-fields",
        formKey: `fileListForm${key}${id}`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "config.actions[1].ids",
          },
        ],
      },
    },
    [`deleteModalConfirmButtonText${key}${id}`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "Delete {selectedItems, plural, one {file} other {files}}",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `fileListForm${key}${id}`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`filesDeletedToast${key}${id}`]: {
      component: "toast",
      childrenKeys: [
        `filesDeletedToastIcon${key}${id}`,
        `filesDeletedToastText${key}${id}`,
      ],
    },
    [`filesDeletedToastIcon${key}${id}`]: {
      component: "icon",
      config: {
        type: IconType.Success,
      },
    },
    [`filesDeletedToastText${key}${id}`]: {
      component: "p1-component",
      childrenKeys: [`filesDeletedToastMessage${key}${id}`],
    },
    [`filesDeletedToastMessage${key}${id}`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "{selectedItems} {selectedItems, plural, one {file} other {files}} deleted",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `fileListForm${key}${id}`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`deleteProgressModal${key}${id}`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [
        `deleteProgressModalIcon${key}${id}`,
        `deleteProgressModalTitle${key}${id}`,
      ],
    },
    [`deleteProgressModalIcon${key}${id}`]: {
      component: "modal.titleIcon",
      config: {
        type: IconType.SpinnerDark,
      },
    },
    [`deleteProgressModalTitle${key}${id}`]: {
      component: "modal.title",
      config: {
        text: "Deleting, please wait...",
      },
    },
  }
}
