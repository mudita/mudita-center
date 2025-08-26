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
            key: "selectedItems",
            value: [singleEntityId],
          },
        ] as ButtonTextConfig["actions"])
      : []),
    {
      type: "open-modal",
      modalKey: `${key}deleteModal`,
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
      config: {
        size: "small",
      },
      childrenKeys: [
        `${key}deleteModalIcon`,
        `${key}deleteModalTitle`,
        `${key}deleteModalContent`,
        `${key}deleteModalButtons`,
      ],
    },
    [`${key}deleteModalIcon`]: {
      component: "modal.titleIcon",
      config: {
        type: IconType.Exclamation,
      },
    },
    [`${key}deleteModalTitle`]: {
      component: "modal.title",
      childrenKeys: [`${key}deleteModalTitleText`],
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
    [`${key}deleteModalButtons`]: {
      component: "modal.buttons",
      childrenKeys: [
        `${key}deleteModalCancelButton`,
        `${key}deleteModalConfirmButton`,
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
                  modalKey: `${key}deleteErrorModal`,
                },
              ],
            },
          },
        ],
      },
      childrenKeys: [`${key}deleteModalConfirmButtonText`],
      layout: {
        flexLayout: {
          direction: "row",
          justifyContent: "center",
        },
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
