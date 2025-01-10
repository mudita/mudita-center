/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator } from "generic-view/utils"
import { McFileManagerConfig } from "generic-view/models"

export const generateFileUploadButtonKey = (key: string) =>
  `${key}filesUploadButton`

export const generateFileUploadButton: ComponentGenerator<
  Pick<
    McFileManagerConfig["categories"][number],
    "entityType" | "supportedFileTypes" | "directoryPath" | "label"
  > & {
    storagePath: string
  }
> = (key, { directoryPath, storagePath, entityType, supportedFileTypes, label }) => {
  return {
    [generateFileUploadButtonKey(key)]: {
      component: "mc-files-manager-upload",
      layout: {
        width: "156px",
      },
      config: {
        buttonText: "Add file",
        fileTypes: supportedFileTypes,
        fileTypeGroupName: label,
        storagePath: storagePath,
        directoryPath: directoryPath,
        entitiesType: entityType,
      },
    },
  }
}
