/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { McFileManagerConfig } from "generic-view/models"

export const generateExportProcessButtonKey = (key: string) =>
  `${key}filesExportButton`

export const generateExportModalKey = (key: string, modalName: string) => {
  return generateExportProcessButtonKey(key) + "Modal" + modalName
}

export const generateFileExportProcessButton: ComponentGenerator<
  Pick<
    McFileManagerConfig["categories"][number],
    "entityType" | "supportedFileTypes" | "directoryPath" | "label"
  > & {
    storagePath: string
  }
> = (
  key,
  { directoryPath, storagePath, entityType, supportedFileTypes, label }
) => {
  const exportActionId = entityType + "Export"
  console.log(entityType)
  return {
    [generateExportProcessButtonKey(key)]: {
      component: "button-text",
      config: {
        text: entityType === "applicationFiles" ? "Export APK" : "Export",
        icon: IconType.Export,
        actions: [
          {
            type: "select-directory",
            title: "Choose a directory to export",
            formOptions: {
              formKey: `${key}fileExportForm`,
              selectedDirectoryFieldName: "exportPath",
            },
          },
          {
            type: "open-modal",
            modalKey: generateExportModalKey(key, "Progress"),
          },
          {
            type: "export-files",
            formOptions: {
              formKey: `${key}fileExportForm`,
              selectedDirectoryFieldName: "exportPath",
            },
            destinationPath: "exportPath",
            sourceFormKey: `${key}fileListForm`,
            selectedItemsFieldName: "selectedItems",
            entitiesType: entityType,
            actionId: exportActionId,
            preActions: {
              validationFailure: [
                {
                  type: "replace-modal",
                  modalKey: generateExportModalKey(key, "ValidationFailure"),
                },
              ],
            },
            postActions: {
              success: [
                {
                  type: "close-modal",
                  modalKey: generateExportModalKey(key, "Progress"),
                },
                {
                  type: "open-toast",
                  toastKey: `${key}FilesExportedToast`,
                },
              ],
              failure: [
                {
                  type: "replace-modal",
                  modalKey: generateExportModalKey(key, "Finished"),
                },
              ],
            },
          },
        ],
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
      childrenKeys: [`${key}fileExportForm`],
    },
    [generateExportModalKey(key, "Progress")]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [generateExportModalKey(key, "ProgressContent")],
    },

    [generateExportModalKey(key, "ProgressContent")]: {
      component: "mc-files-manager-upload-progress",
      config: {
        storagePath,
        directoryPath,
        entitiesType: entityType,
        transferActionId: exportActionId,
        actionType: "export",
      },
    },
    [`${key}fileExportForm`]: {
      component: "form",
      config: {
        formOptions: {
          defaultValues: {
            exportPath: "",
          },
        },
      },
    },
  }
}
