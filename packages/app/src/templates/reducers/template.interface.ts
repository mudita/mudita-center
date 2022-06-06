/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { TemplatesEvent } from "App/templates/constants"
import { CreateTemplateError } from "App/templates/errors"
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
  CreateTemplateError,
  TemplatesEvent.CreateTemplate,
  void,
  Error | string | null
>
