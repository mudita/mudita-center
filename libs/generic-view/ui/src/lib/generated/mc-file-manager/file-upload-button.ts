/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { McFileManagerConfig } from "generic-view/models"

export const generateFileUploadButtonKey = (key: string) =>
  `${key}filesUploadButton`

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
          //   modalKey: `${key}filesUploadModal`,
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
    [`${key}filesUploadModal`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [
        `${key}filesUploadModalIcon`,
        `${key}filesUploadModalTitle`,
        `${key}filesUploadModalContent`,
      ],
    },
    [`${key}filesUploadModalIcon`]: {
      component: "modal.titleIcon",
      config: {
        type: IconType.Spinner,
      },
    },
    [`${key}filesUploadModalTitle`]: {
      component: "modal.title",
      childrenKeys: [`${key}filesUploadModalTitleText`],
    },
    [`${key}filesUploadModalTitleText`]: {
      component: "format-message",
      config: {
        messageTemplate: "Adding file",
      },
    },
    [`${key}filesUploadModalContent`]: {
      component: "typography.p1",
      config: {
        messageTemplate: "Uploading...",
      },
    },
  }
}
