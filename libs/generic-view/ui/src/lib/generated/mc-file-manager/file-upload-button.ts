/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { McFileManagerConfig } from "generic-view/models"

export const generateFileUploadProcessButtonKey = (key: string) => {
  return `${key}filesUploadButton`
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
  const generateFileUploadButtonModalKey = (modalName: string) => {
    return generateFileUploadProcessButtonKey(key) + "Modal" + modalName
  }
  const uploadActionId = entityType + "Upload"
  return {
    [generateFileUploadProcessButtonKey(key)]: {
      component: "button-primary",
      layout: {
        width: "156px",
      },
      config: {
        text: "Add file",
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
            modalKey: generateFileUploadButtonModalKey("Progress"),
          },
          {
            type: "upload-files",
            formOptions: {
              formKey: `${key}fileListForm`,
              filesToUploadFieldName: "filesToUpload",
            },
            destinationPath: storagePath + directoryPath,
            entitiesType: entityType,
            actionId: uploadActionId,
            preActions: {
              validationFailure: [
                {
                  type: "replace-modal",
                  modalKey:
                    generateFileUploadButtonModalKey("ValidationFailure"),
                },
              ],
            },
            postActions: {
              success: [
                {
                  type: "close-modal",
                  modalKey: generateFileUploadButtonModalKey("Progress"),
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
                  modalKey: generateFileUploadButtonModalKey("Finished"),
                },
              ],
            },
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
    [generateFileUploadButtonModalKey("Progress")]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [generateFileUploadButtonModalKey("ProgressContent")],
    },
    [generateFileUploadButtonModalKey("ProgressContent")]: {
      component: "mc-files-manager-upload-progress",
      config: {
        storagePath,
        directoryPath,
        entitiesType: entityType,
        uploadActionId,
      },
    },
    [generateFileUploadButtonModalKey("Finished")]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [generateFileUploadButtonModalKey("FinishedContent")],
    },
    [generateFileUploadButtonModalKey("FinishedContent")]: {
      component: "mc-files-manager-upload-finished",
      config: {
        modalKey: generateFileUploadButtonModalKey("Finished"),
        uploadActionId,
      },
    },
    [generateFileUploadButtonModalKey("ValidationFailure")]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [
        generateFileUploadButtonModalKey("ValidationFailureContent"),
      ],
    },
    [generateFileUploadButtonModalKey("ValidationFailureContent")]: {
      component: "mc-files-manager-upload-validation-error",
      config: {
        modalKey: generateFileUploadButtonModalKey("ValidationFailure"),
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
