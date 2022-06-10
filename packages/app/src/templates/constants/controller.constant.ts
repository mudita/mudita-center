/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "template"

export enum IpcTemplateEvent {
  CreateTemplate = "create-template",
  DeleteTemplates = "delete-templates",
  UpdateTemplate = "update-template",
}

export enum IpcTemplateRequest {
  CreateTemplate = "template-create-template",
  DeleteTemplates = "template-delete-templates",
  UpdateTemplate = "template-update-template",
}
