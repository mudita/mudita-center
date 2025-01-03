/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview, IconType } from "generic-view/utils"

export const generateDeleteFiles = (
  id: string,
  entitiesType: string
): Subview => {
  return {
    [`${id}deleteModal`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [
        `${id}deleteModalIcon`,
        `${id}deleteModalTitle`,
        `${id}deleteModalContent`,
        `${id}deleteModalButtons`,
      ],
    },
    [`${id}deleteModalIcon`]: {
      component: "modal.titleIcon",
      config: {
        type: IconType.Exclamation,
      },
    },
    [`${id}deleteModalTitle`]: {
      component: "modal.title",
      childrenKeys: [`${id}deleteModalTitleText`],
    },
    [`${id}deleteModalTitleText`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "Delete {selectedItems, plural, one {file} other {# files}}?",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${id}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`${id}deleteModalContent`]: {
      component: "p1-component",
      childrenKeys: [`${id}deleteModalContentText`],
    },
    [`${id}deleteModalContentText`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "This will remove the {selectedItems, plural, one {file} other {files}} from Kompakt.",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${id}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`${id}deleteModalButtons`]: {
      component: "modal.buttons",
      childrenKeys: [
        `${id}deleteModalCancelButton`,
        `${id}deleteModalConfirmButton`,
      ],
    },
    [`${id}deleteModalCancelButton`]: {
      component: "button-secondary",
      config: {
        text: "Cancel",
        actions: [
          {
            type: "close-modal",
            modalKey: `${id}deleteModal`,
          },
        ],
      },
    },
    [`${id}deleteModalConfirmButton`]: {
      component: "button-primary",
      config: {
        actions: [
          {
            type: "open-modal",
            modalKey: `${id}deleteProgressModal`,
            domain: "files-delete",
          },
          {
            type: "entities-delete",
            entitiesType,
            ids: [],
            postActions: {
              success: [
                {
                  type: "close-domain-modals",
                  domain: "files-delete",
                },
                {
                  type: "open-toast",
                  toastKey: `${id}filesDeletedToast`,
                },
              ],
            },
          },
        ],
      },
      childrenKeys: [`${id}deleteModalConfirmButtonText`],
      layout: {
        flexLayout: {
          direction: "row",
          justifyContent: "center",
        },
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${id}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "config.actions[1].ids",
          },
        ],
      },
    },
    [`${id}deleteModalConfirmButtonText`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "Delete {selectedItems, plural, one {file} other {files}}",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${id}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`${id}filesDeletedToast`]: {
      component: "toast",
      childrenKeys: [
        `${id}filesDeletedToastIcon`,
        `${id}filesDeletedToastText`,
      ],
    },
    [`${id}filesDeletedToastIcon`]: {
      component: "icon",
      config: {
        type: IconType.Success,
      },
    },
    [`${id}filesDeletedToastText`]: {
      component: "p1-component",
      childrenKeys: [`${id}filesDeletedToastMessage`],
    },
    [`${id}filesDeletedToastMessage`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "{selectedItems} {selectedItems, plural, one {file} other {files}} deleted",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${id}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`${id}deleteProgressModal`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [
        `${id}deleteProgressModalIcon`,
        `${id}deleteProgressModalTitle`,
      ],
    },
    [`${id}deleteProgressModalIcon`]: {
      component: "modal.titleIcon",
      config: {
        type: IconType.SpinnerDark,
      },
    },
    [`${id}deleteProgressModalTitle`]: {
      component: "modal.title",
      config: {
        text: "Deleting, please wait...",
      },
    },
  }
}
