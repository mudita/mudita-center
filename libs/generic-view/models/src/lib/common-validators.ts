/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { entityDataSchema } from "../../../../device/models/src/lib/entities/entity-data.validator"

export const modalSizeValidator = z.enum(["small", "medium", "large"])

export const modalActionValidator = z.union([
  z.object({
    type: z.literal("open-modal"),
    domain: z.string().optional(),
    modalKey: z.string(),
    permanent: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("replace-modal"),
    domain: z.string().optional(),
    modalKey: z.string(),
    permanent: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("close-modal"),
    domain: z.string().optional(),
    modalKey: z.string(),
  }),
  z.object({
    type: z.literal("close-domain-modals"),
    domain: z.string(),
  }),
  z.object({
    type: z.literal("close-all-modals"),
  }),
])

export type ModalAction = z.infer<typeof modalActionValidator>

export const navigateActionValidator = z.object({
  type: z.literal("navigate"),
  viewKey: z.string(),
})

export type NavigateAction = z.infer<typeof navigateActionValidator>

export const customActionValidator = z.object({
  type: z.literal("custom"),
  callback: z.function(),
})

export type CustomAction = z.infer<typeof customActionValidator>

export const formActionValidator = z.union([
  z.object({
    type: z.literal("form-set-field"),
    key: z.string(),
    formKey: z.string().optional(),
    value: z
      .union([
        z.string(),
        z.number(),
        z.boolean(),
        z.array(z.unknown()),
        z.record(z.union([z.string(), z.number()]), z.unknown()),
      ])
      .optional(),
  }),
  z.object({
    type: z.literal("form-toggle-field"),
    key: z.string(),
    formKey: z.string().optional(),
  }),
  z.object({
    type: z.literal("form-reset"),
    formKey: z.string().optional(),
  }),
])

export const toastActionValidator = z.object({
  type: z.literal("open-toast"),
  toastKey: z.string(),
})

const entityPostActionsValidator = z
  .array(
    z.union([
      modalActionValidator,
      navigateActionValidator,
      customActionValidator,
      formActionValidator,
      toastActionValidator,
    ])
  )
  .optional()

export const entityActionValidator = z.union([
  z.object({
    type: z.literal("entities-delete"),
    entitiesType: z.string(),
    ids: z.array(z.string()),
    postActions: z
      .object({
        success: entityPostActionsValidator,
        failure: entityPostActionsValidator,
      })
      .optional(),
  }),
  z.object({
    type: z.literal("entity-create"),
    entitiesType: z.string(),
    data: entityDataSchema,
    postActions: z
      .object({
        success: entityPostActionsValidator,
        failure: entityPostActionsValidator,
      })
      .optional(),
  }),
])

export type EntityAction = z.infer<typeof entityActionValidator>

const nativeActionSelectFilesValidator = z.object({
  type: z.literal("select-files"),
  multiple: z.boolean().optional(),
  extensions: z.array(z.string()).optional(),
  extensionsGroupName: z.string().optional(),
  formOptions: z.object({
    formKey: z.string().optional(),
    selectedFilesFieldName: z.string(),
  }),
})

export type NativeActionSelectFiles = z.infer<
  typeof nativeActionSelectFilesValidator
>

const nativeActionSelectDirectoryValidator = z.object({
  // TODO: Implement "select-directory" action
  type: z.literal("select-directory"),
})

export const nativeActionsValidator = z.union([
  nativeActionSelectFilesValidator,
  nativeActionSelectDirectoryValidator,
])

const filesTransferUploadFilesActionValidator = z.object({
  type: z.literal("upload-files"),
  destinationPath: z.string(),
  freeSpace: z.number().positive(),
  entitiesType: z.string().optional(),
  actionId: z.string(),
  formOptions: z.object({
    formKey: z.string().optional(),
    filesToUploadFieldName: z.string(),
  }),
  preActions: z
    .object({
      validationFailure: entityPostActionsValidator,
    })
    .optional(),
  postActions: z
    .object({
      success: entityPostActionsValidator,
      failure: entityPostActionsValidator,
    })
    .optional(),
})

export type FilesTransferUploadFilesAction = z.infer<
  typeof filesTransferUploadFilesActionValidator
>

const filesTransferDownloadFilesActionValidator = z.object({
  // TODO: Implement "download-files" action
  type: z.literal("download-files"),
})

export const filesTransferActionValidator = z.union([
  filesTransferUploadFilesActionValidator,
  filesTransferDownloadFilesActionValidator,
])

const startAppInstallationActionValidator = z.object({
  type: z.literal("start-app-installation"),
  filePath: z.string(),
  fileName: z.string(),
  postActions: z
    .object({
      success: entityPostActionsValidator,
      failure: entityPostActionsValidator,
    })
    .optional(),
})

export type StartAppInstallationAction = z.infer<
  typeof startAppInstallationActionValidator
>

export const buttonActionsValidator = z.array(
  z.union([
    modalActionValidator,
    navigateActionValidator,
    customActionValidator,
    formActionValidator,
    entityActionValidator,
    toastActionValidator,
    nativeActionsValidator,
    filesTransferActionValidator,
    startAppInstallationActionValidator,
  ])
)

export type ButtonActions = z.infer<typeof buttonActionsValidator>
export type ButtonAction = ButtonActions[number]
