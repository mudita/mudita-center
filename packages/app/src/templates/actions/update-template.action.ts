/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { TemplateError, TemplatesEvent } from "App/templates/constants"
import { Template } from "App/templates/dto"
import { updateTemplateRequest } from "App/templates/requests/update-template.request"

export const updateTemplate = createAsyncThunk<Error | Template, Template>(
  TemplatesEvent.UpdateTemplate,
  async (template, { rejectWithValue }) => {
    const { data, error } = await updateTemplateRequest(template)

    if (error || !data) {
      return rejectWithValue(
        new AppError(
          TemplateError.UpdateTemplate,
          error?.data || "Something went wrong"
        )
      )
    }

    return data
  }
)
