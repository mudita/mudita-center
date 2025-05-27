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
    [`${key}${id}deleteModal`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [
        `${key}${id}deleteModalIcon`,
        `${key}${id}deleteModalTitle`,
        `${key}${id}deleteModalContent`,
        `${key}${id}deleteModalButtons`,
      ],
    },
    [`${key}${id}deleteModalIcon`]: {
      component: "modal.titleIcon",
      config: {
        type: IconType.Exclamation,
      },
    },
    [`${key}${id}deleteModalTitle`]: {
      component: "modal.title",
      childrenKeys: [`${key}${id}deleteModalTitleText`],
    },
    [`${key}${id}deleteModalTitleText`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "Delete {selectedItems, plural, one {file} other {# files}}?",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}${id}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`${key}${id}deleteModalContent`]: {
      component: "typography.p1",
      config: {
        messageTemplate:
          "This will remove the {selectedItems, plural, one {file} other {files}} from Kompakt.",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}${id}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`${key}${id}deleteModalButtons`]: {
      component: "modal.buttons",
      childrenKeys: [
        `${key}${id}deleteModalCancelButton`,
        `${key}${id}deleteModalConfirmButton`,
      ],
    },
    [`${key}${id}deleteModalCancelButton`]: {
      component: "button-secondary",
      config: {
        text: "Cancel",
        actions: [
          {
            type: "close-modal",
            modalKey: `${key}${id}deleteModal`,
          },
        ],
      },
    },
    [`${key}${id}deleteModalConfirmButton`]: {
      component: "button-primary",
      config: {
        actions: [
          {
            type: "open-modal",
            modalKey: `${key}${id}deleteProgressModal`,
            domain: "files-delete",
          },
          {
            type: "entities-delete",
            entitiesType: entityType,
            ids: [],
            successMessage:
              "{count, plural, one {# file} other {# files}} deleted",
            postActions: {
              success: [
                {
                  type: "close-domain-modals",
                  domain: "files-delete",
                },
              ],
              failure: [
                {
                  type: "close-domain-modals",
                  domain: "files-delete",
                },
                {
                  type: "open-modal",
                  modalKey: `${key}${id}deleteErrorModal`,
                },
              ],
            },
          },
        ],
      },
      childrenKeys: [`${key}${id}deleteModalConfirmButtonText`],
      layout: {
        flexLayout: {
          direction: "row",
          justifyContent: "center",
        },
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}${id}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "config.actions[1].ids",
          },
        ],
      },
    },
    [`${key}${id}deleteModalConfirmButtonText`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "Delete {selectedItems, plural, one {file} other {files}}",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}${id}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`${key}${id}deleteProgressModal`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [
        `${key}${id}deleteProgressModalIcon`,
        `${key}${id}deleteProgressModalTitle`,
      ],
    },
    [`${key}${id}deleteProgressModalIcon`]: {
      component: "modal.titleIcon",
      config: {
        type: IconType.SpinnerDark,
      },
    },
    [`${key}${id}deleteProgressModalTitle`]: {
      component: "modal.title",
      config: {
        text: "Deleting, please wait...",
      },
    },
    [`${key}${id}deleteErrorModal`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [`${key}${id}deleteErrorModalContent`],
    },
    [`${key}${id}deleteErrorModalContent`]: {
      component: "entities-delete-error",
      config: {
        modalKey: `${key}${id}deleteErrorModal`,
        entitiesType: entityType,
      },
    },
  }
}
