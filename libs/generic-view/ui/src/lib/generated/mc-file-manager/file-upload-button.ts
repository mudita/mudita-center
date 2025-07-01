/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { McFileManagerConfig } from "generic-view/models"

export const generateFileUploadProcessButtonKey = (key: string) => {
  return `${key}filesUploadButton`
}

export const generateFileUploadButtonModalKey = (
  key: string,
  modalName: string
) => {
  return generateFileUploadProcessButtonKey(key) + "Modal" + modalName
}

export const generateFileUploadProcessButton: ComponentGenerator<
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
  const uploadActionId = entityType + "Upload"
  return {
    [generateFileUploadProcessButtonKey(key)]: {
      component: "button-primary",
      layout: {
        width: "156px",
      },
      config: {
        text: entityType === "applicationFiles" ? "Add app files" : "Add file",
        actions: [
          {
            type: "select-files",
            multiple: true,
            extensions: supportedFileTypes,
            extensionsGroupName: label,
            formOptions: {
              formKey: `${key}fileListForm`,
              selectedFilesFieldName: "filesToUpload",
            },
          },
          {
            type: "open-modal",
            modalKey: generateFileUploadButtonModalKey(key, "Progress"),
          },
          {
            type: "upload-files",
            formOptions: {
              formKey: `${key}fileListForm`,
              filesToUploadFieldName: "filesToUpload",
            },
            destinationPath: storagePath + directoryPath,
            isInternal: storagePath.startsWith("/storage/emulated/0"),
            freeSpace: 0,
            entitiesType: entityType,
            actionId: uploadActionId,
            preActions: {
              validationFailure: [
                {
                  type: "replace-modal",
                  modalKey: generateFileUploadButtonModalKey(
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
                  modalKey: generateFileUploadButtonModalKey(key, "Progress"),
                },
                {
                  type: "open-toast",
                  toastKey: `${key}FilesUploadedToast`,
                },
                {
                  type: "form-set-field",
                  formKey: `${key}fileListForm`,
                  key: "filesToUpload",
                  value: [],
                },
              ],
              failure: [
                {
                  type: "form-set-field",
                  formKey: `${key}fileListForm`,
                  key: "filesToUpload",
                  value: [],
                },
                {
                  type: "replace-modal",
                  modalKey: generateFileUploadButtonModalKey(key, "Finished"),
                },
              ],
            },
          },
        ],
      },
      dataProvider: {
        source: "self",
        fields: [
          {
            providerField: "data.freeSpace",
            componentField: "config.actions[2].freeSpace",
          },
        ],
      },
    },
    [`${key}FilesUploadedToast`]: {
      component: "toast",
      childrenKeys: [
        `${key}FilesUploadedToastIcon`,
        `${key}FilesUploadedToastText`,
      ],
    },
    [`${key}FilesUploadedToastIcon`]: {
      component: "icon",
      config: {
        type: IconType.Success,
      },
    },
    [`${key}FilesUploadedToastText`]: {
      component: "typography.p1",
      config: {
        messageTemplate:
          "{uploadedFiles} {uploadedFiles, plural, one {file} other {files}} added",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}fileListForm`,
        fields: [
          {
            providerField: "filesToUpload",
            componentField: "data.fields.uploadedFiles",
            modifier: "length",
          },
        ],
      },
    },
    [generateFileUploadButtonModalKey(key, "Progress")]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [generateFileUploadButtonModalKey(key, "ProgressContent")],
    },
    [generateFileUploadButtonModalKey(key, "ProgressContent")]: {
      component: "mc-files-manager-upload-progress",
      config: {
        storagePath,
        directoryPath,
        entitiesType: entityType,
        transferActionId: uploadActionId,
        actionType: "upload",
      },
    },
    [generateFileUploadButtonModalKey(key, "Finished")]: {
      component: "modal",
      config: {
        size: "small",
        maxHeight: "538px",
      },
      childrenKeys: [generateFileUploadButtonModalKey(key, "FinishedContent")],
    },
    [generateFileUploadButtonModalKey(key, "FinishedContent")]: {
      component: "mc-files-manager-upload-finished",
      config: {
        modalKey: generateFileUploadButtonModalKey(key, "Finished"),
        uploadActionId,
      },
    },
    [generateFileUploadButtonModalKey(key, "ValidationFailure")]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [
        generateFileUploadButtonModalKey(key, "ValidationFailureContent"),
      ],
    },
    [generateFileUploadButtonModalKey(key, "ValidationFailureContent")]: {
      component: "mc-files-manager-upload-validation-error",
      config: {
        modalKey: generateFileUploadButtonModalKey(key, "ValidationFailure"),
        uploadActionId,
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}fileListForm`,
        fields: [
          {
            providerField: "filesToUpload",
            componentField: "data.fileList",
          },
        ],
      },
    },
  }
}
