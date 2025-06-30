/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { McFileManagerConfig } from "generic-view/models"

export const generateExportProcessButtonKey = (key: string) =>
  `${key}filesExportButton`
export const generateExportModalKey = (key: string) => `${key}filesExportModal`

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
    },
  }
}
