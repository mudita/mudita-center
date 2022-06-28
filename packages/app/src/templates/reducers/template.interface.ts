/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { TemplatesEvent } from "App/templates/constants"
import {
  CreateTemplateError,
  DeleteTemplateError,
  UpdateTemplateError,
} from "App/templates/errors"
import { Template } from "App/templates/dto"
import { RequestResponse } from "App/core/types/request-response.interface"

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
  CreateTemplateError,
  TemplatesEvent.CreateTemplate,
  void,
  Error | string | null
>

export type UpdateTemplateFulfilledAction = PayloadAction<
  Template,
  TemplatesEvent.UpdateTemplate
>

export type UpdateTemplateRejectedAction = PayloadAction<
  UpdateTemplateError,
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
  DeleteTemplateError,
  TemplatesEvent.DeleteTemplates,
  void,
  Error | string | null
>

export type UpdateTemplateOrderFulfilledAction = PayloadAction<
  Template,
  TemplatesEvent.UpdateTemplateOrder
>

export type UpdateTemplateOrderRejectedAction = PayloadAction<
  UpdateTemplateError,
  TemplatesEvent.UpdateTemplateOrder,
  void,
  Error | string | null
>
