/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { RequestResponse } from "App/core/types/request-response.interface"
import { TemplateError, TemplatesEvent } from "App/templates/constants"
import { Template } from "App/templates/dto"

export interface TemplateState {
  data: Template[]
  loading: boolean
  loaded: boolean
  error: Error | string | null
}

export type CreateTemplateFulfilledAction = PayloadAction<
  Template,
  TemplatesEvent.CreateTemplate
>

export type CreateTemplateRejectedAction = PayloadAction<
  AppError<TemplateError.CreateTemplate>,
  TemplatesEvent.CreateTemplate,
  void,
  Error | string | null
>

export type UpdateTemplateFulfilledAction = PayloadAction<
  Template,
  TemplatesEvent.UpdateTemplate
>

export type UpdateTemplateRejectedAction = PayloadAction<
  AppError<TemplateError.UpdateTemplate>,
  TemplatesEvent.UpdateTemplate,
  void,
  Error | string | null
>

export type DeleteTemplateAction = PayloadAction<
  string[],
  TemplatesEvent.DeleteTemplates
>

export type DeletedTemplatesIds = string[]
type ErrorTemplatesIds = string[]
type SuccessTemplatesIds = string[]
type ErrorTemplatesData = {
  errorIds: ErrorTemplatesIds
  successIds: SuccessTemplatesIds
}

export type DeleteTemplateRequestResponse = RequestResponse<
  DeletedTemplatesIds,
  ErrorTemplatesData
>

export type DeleteTemplateRejectedAction = PayloadAction<
  AppError<TemplateError.DeleteTemplate>,
  TemplatesEvent.DeleteTemplates,
  void,
  Error | string | null
>

export type UpdateTemplateOrderFulfilledAction = PayloadAction<
  Template,
  TemplatesEvent.UpdateTemplateOrder
>

export type UpdateTemplateOrderRejectedAction = PayloadAction<
  AppError<TemplateError.UpdateTemplateOrder>,
  TemplatesEvent.UpdateTemplateOrder,
  void,
  Error | string | null
>
