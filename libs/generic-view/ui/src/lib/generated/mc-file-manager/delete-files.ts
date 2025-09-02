/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { ButtonTextConfig } from "generic-view/models"

export const generateDeleteFilesButtonActions = (
  key: string,
  { singleEntityId }: { singleEntityId?: string } = {}
): ButtonTextConfig["actions"] => {
  return [
    ...(singleEntityId !== undefined
      ? ([
          {
            type: "form-set-field",
            formKey: `${key}fileListForm`,
            key: "activeItemId",
            value: singleEntityId,
          },
        ] as ButtonTextConfig["actions"])
      : []),
    {
      type: "open-modal",
      modalKey:
        singleEntityId !== undefined
          ? `${key}deletePreviewModal`
          : `${key}deleteModal`,
      domain: "files-delete",
    },
  ]
}

export const generateDeleteFiles: ComponentGenerator<{
  entityType: string
}> = (key, { entityType }) => {
  return {
    [`${key}deleteModal`]: {
      component: "modal",
      config: { size: "small" },
      childrenKeys: [
        `${key}deleteModalIcon`,
        `${key}deleteModalTitle`,
        `${key}deleteModalContent`,
        `${key}deleteModalButtons`,
      ],
    },
    [`${key}deletePreviewModal`]: {
      component: "modal",
      config: { size: "small" },
      childrenKeys: [
        `${key}deleteModalIcon`,
        `${key}deletePreviewModalTitle`,
        `${key}deletePreviewModalContent`,
        `${key}deletePreviewModalButtons`,
      ],
    },
    [`${key}deleteModalIcon`]: {
      component: "modal.titleIcon",
      config: { type: IconType.Exclamation },
    },
    [`${key}deleteModalTitle`]: {
      component: "modal.title",
      childrenKeys: [`${key}deleteModalTitleText`],
    },
    [`${key}deletePreviewModalTitle`]: {
      component: "modal.title",
      childrenKeys: [`${key}deletePreviewModalTitleText`],
    },
    [`${key}deleteModalTitleText`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "Delete {selectedItems, plural, one {file} other {# files}}?",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`${key}deletePreviewModalTitleText`]: {
      component: "format-message",
      config: { messageTemplate: "Delete file?" },
    },
    [`${key}deleteModalContent`]: {
      component: "typography.p1",
      config: {
        messageTemplate:
          "This will remove the {selectedItems, plural, one {file} other {files}} from Kompakt.",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`${key}deletePreviewModalContent`]: {
      component: "typography.p1",
      config: { text: "This will remove the file from Kompakt" },
    },
    [`${key}deleteModalButtons`]: {
      component: "modal.buttons",
      childrenKeys: [
        `${key}deleteModalCancelButton`,
        `${key}deleteModalConfirmButton`,
      ],
    },
    [`${key}deletePreviewModalButtons`]: {
      component: "modal.buttons",
      childrenKeys: [
        `${key}deleteModalCancelButton`,
        `${key}deletePreviewModalConfirmButton`,
      ],
    },
    [`${key}deleteModalCancelButton`]: {
      component: "button-secondary",
      config: {
        text: "Cancel",
        actions: [
          {
            type: "close-modal",
            modalKey: `${key}deleteModal`,
          },
        ],
      },
    },
    [`${key}deleteModalConfirmButton`]: {
      component: "button-primary",
      config: {
        actions: [
          {
            type: "open-modal",
            modalKey: `${key}deleteProgressModal`,
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
                { type: "close-domain-modals", domain: "files-delete" },
              ],
              failure: [
                { type: "close-domain-modals", domain: "files-delete" },
                { type: "open-modal", modalKey: `${key}deleteErrorModal` },
              ],
            },
          },
        ],
      },
      childrenKeys: [`${key}deleteModalConfirmButtonText`],
      layout: {
        flexLayout: { direction: "row", justifyContent: "center" },
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "config.actions[1].ids",
          },
        ],
      },
    },
    [`${key}deleteModalConfirmButtonText`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "Delete {selectedItems, plural, one {file} other {files}}",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`${key}deletePreviewModalConfirmButton`]: {
      component: "button-primary",
      config: {
        actions: [
          {
            type: "open-modal",
            modalKey: `${key}deleteProgressModal`,
            domain: "files-delete",
          },
          {
            type: "entities-delete",
            entitiesType: entityType,
            ids: [],
            activeItemId: undefined,
            successMessage: "1 file deleted",
            postActions: {
              success: [
                { type: "close-domain-modals", domain: "files-delete" },
              ],
              failure: [
                { type: "close-domain-modals", domain: "files-delete" },
                { type: "open-modal", modalKey: `${key}deleteErrorModal` },
              ],
            },
          },
        ],
      },
      childrenKeys: [`${key}deletePreviewModalConfirmButtonText`],
      layout: {
        flexLayout: { direction: "row", justifyContent: "center" },
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}fileListForm`,
        fields: [
          {
            providerField: "activeItemId",
            componentField: "config.actions[1].activeItemId",
          },
        ],
      },
    },
    [`${key}deletePreviewModalConfirmButtonText`]: {
      component: "format-message",
      config: { messageTemplate: "Delete file" },
    },
    [`${key}deleteProgressModal`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [
        `${key}deleteProgressModalIcon`,
        `${key}deleteProgressModalTitle`,
      ],
    },
    [`${key}deleteProgressModalIcon`]: {
      component: "modal.titleIcon",
      config: {
        type: IconType.SpinnerDark,
      },
    },
    [`${key}deleteProgressModalTitle`]: {
      component: "modal.title",
      config: {
        text: "Deleting, please wait...",
      },
    },
    [`${key}deleteErrorModal`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [`${key}deleteErrorModalContent`],
    },
    [`${key}deleteErrorModalContent`]: {
      component: "entities-delete-error",
      config: {
        modalKey: `${key}deleteErrorModal`,
        entitiesType: entityType,
      },
    },
  }
}
