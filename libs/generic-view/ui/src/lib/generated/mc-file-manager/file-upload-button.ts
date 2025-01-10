/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { McFileManagerConfig } from "generic-view/models"

export const generateFileUploadButtonKey = (key: string) =>
  `filesUploadButton${key}`

export const generateFileUploadButton: ComponentGenerator<
  Pick<
    McFileManagerConfig["categories"][number],
    "entityType" | "supportedFileTypes" | "directoryPath"
  > & {
    storagePath: string
  }
> = (key, { directoryPath, storagePath, entityType, supportedFileTypes }) => {
  return {
    [generateFileUploadButtonKey(key)]: {
      component: "button-primary",
      layout: {
        width: "156px",
      },
      config: {
        text: "Add file",
        actions: [
          // {
          //   type: "open-modal",
          //   modalKey: `filesUploadModal${key}`,
          // },
          // {
          //   type: "file-upload",
          //   storagePath: storagePath + directoryPath,
          //   fileTypes: supportedFileTypes,
          //   entitiesType: entityType,
          // },
        ],
      },
    },
    [`filesUploadModal${key}`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [
        `filesUploadModalIcon${key}`,
        `filesUploadModalTitle${key}`,
        `filesUploadModalContent${key}`,
      ],
    },
    [`filesUploadModalIcon${key}`]: {
      component: "modal.titleIcon",
      config: {
        type: IconType.Spinner,
      },
    },
    [`filesUploadModalTitle${key}`]: {
      component: "modal.title",
      childrenKeys: [`filesUploadModalTitleText${key}`],
    },
    [`filesUploadModalTitleText${key}`]: {
      component: "format-message",
      config: {
        messageTemplate: "Adding file",
      },
    },
    [`filesUploadModalContent${key}`]: {
      component: "p1-component",
      childrenKeys: [`filesUploadModalContentText${key}`],
    },
    [`filesUploadModalContentText${key}`]: {
      component: "format-message",
      config: {
        messageTemplate: "Uploading...",
      },
    },
  }
}
