/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { ButtonTextConfig, McFileManagerConfig } from "generic-view/models"
import { SendFilesAction } from "../../../../../store/src/lib/file-transfer/files-transfer.type"

export const generateFilesExportProcessButtonKey = (key: string) =>
  `${key}filesExportButton`

export const generateFilesExportButtonModalKey = (
  key: string,
  modalName: string
) => {
  return generateFilesExportProcessButtonKey(key) + "Modal" + modalName
}

export const generateFilesExportButtonActions = (
  key: string,
  {
    singleEntityId,
    entityType,
    exportActionId,
  }: Pick<McFileManagerConfig["categories"][number], "entityType"> & {
    singleEntityId?: string
    exportActionId: string
  }
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
      type: "select-directory",
      title: "Choose a directory to export",
      formOptions: {
        formKey: `${key}fileListForm`,
        selectedDirectoryFieldName: "exportPath",
      },
      ...(singleEntityId !== undefined
        ? {
            postActions: {
              failure: [
                {
                  type: "form-set-field",
                  formKey: `${key}fileListForm`,
                  key: "selectedItems",
                  value: [],
                },
              ],
            },
          }
        : {}),
    },
    {
      type: "open-modal",
      modalKey: generateFilesExportButtonModalKey(key, "Progress"),
    },
    {
      type: "export-files",
      formOptions: {
        formKey: `${key}fileListForm`,
        selectedDirectoryFieldName: "exportPath",
      },
      destinationPath: "exportPath",
      sourceFormKey: `${key}fileListForm`,
      selectedItemsFieldName: "selectedItems",
      entitiesType: entityType,
      singleEntityId,
      actionId: exportActionId,
      preActions: {
        validationFailure: [
          {
            type: "replace-modal",
            modalKey: generateFilesExportButtonModalKey(
              key,
              "ValidationFailure"
            ),
          },
        ],
      },
      postActions: {
        success: [
          {
            type: "close-modal",
            modalKey: generateFilesExportButtonModalKey(key, "Progress"),
          },
          {
            type: "open-toast",
            toastKey: `${key}FilesExportedToast`,
          },
          {
            type: "form-set-field",
            formKey: `${key}fileListForm`,
            key: "selectedItems",
            value: [],
          },
        ],
        failure: [
          {
            type: "form-set-field",
            formKey: `${key}fileListForm`,
            key: "selectedItems",
            value: [],
          },
          {
            type: "replace-modal",
            modalKey: generateFilesExportButtonModalKey(key, "Finished"),
          },
        ],
      },
    },
  ]
}

export const generateFileExportProcessButton: ComponentGenerator<
  Pick<
    McFileManagerConfig["categories"][number],
    "entityType" | "directoryPath"
  > & {
    singleEntityId?: string
    exportActionId: string
  }
> = (key, { directoryPath, entityType, singleEntityId, exportActionId }) => {
  return {
    [generateFilesExportProcessButtonKey(key)]: {
      component: "button-text",
      config: {
        text: entityType === "applicationFiles" ? "Export APK" : "Export",
        icon: IconType.Export,
        actions: generateFilesExportButtonActions(key, {
          singleEntityId,
          entityType,
          exportActionId,
        }),
        modifiers: ["uppercase"],
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
    [generateFilesExportButtonModalKey(key, "Progress")]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [generateFilesExportButtonModalKey(key, "ProgressContent")],
    },

    [generateFilesExportButtonModalKey(key, "ProgressContent")]: {
      component: "mc-files-manager-transfer-progress",
      config: {
        directoryPath,
        entitiesType: entityType,
        transferActionId: exportActionId,
        actionType: SendFilesAction.ActionExport,
      },
      childrenKeys: [generateFilesExportButtonModalKey(key, "Finished")],
    },
    [generateFilesExportButtonModalKey(key, "Finished")]: {
      component: "modal",
      config: {
        size: "small",
        maxHeight: "538px",
      },
      childrenKeys: [generateFilesExportButtonModalKey(key, "FinishedContent")],
    },
    [generateFilesExportButtonModalKey(key, "FinishedContent")]: {
      component: "mc-files-manager-transfer-finished",
      config: {
        modalKey: generateFilesExportButtonModalKey(key, "Finished"),
        transferActionId: exportActionId,
        actionType: SendFilesAction.ActionExport,
      },
    },
    [generateFilesExportButtonModalKey(key, "ValidationFailure")]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [
        generateFilesExportButtonModalKey(key, "ValidationFailureContent"),
      ],
    },
    [generateFilesExportButtonModalKey(key, "ValidationFailureContent")]: {
      component: "mc-files-manager-transfer-validation-error",
      config: {
        modalKey: generateFilesExportButtonModalKey(key, "ValidationFailure"),
        fileTransferActionId: exportActionId,
        actionType: SendFilesAction.ActionExport,
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fileList",
          },
        ],
      },
    },
    [`${key}FilesExportedToast`]: {
      component: "toast",
      childrenKeys: [
        `${key}FilesExportedToastIcon`,
        `${key}FilesExportedToastText`,
      ],
    },

    [`${key}FilesExportedToastIcon`]: {
      component: "icon",
      config: {
        type: IconType.Success,
      },
    },

    [`${key}FilesExportedToastText`]: {
      component: "typography.p1",
      config: {
        messageTemplate:
          "{exportedFiles} {exportedFiles, plural, one {file} other {files}} exported",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}fileListForm`,
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.exportedFiles",
            modifier: "length",
          },
        ],
      },
    },
  }
}
