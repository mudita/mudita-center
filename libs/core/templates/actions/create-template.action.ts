/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"
import { TemplateError, TemplatesEvent } from "Core/templates/constants"
import { NewTemplate, Template } from "Core/templates/dto"
import { createTemplateRequest } from "Core/templates/requests/create-template.request"

export const createTemplate = createAsyncThunk<Error | Template, NewTemplate>(
  TemplatesEvent.CreateTemplate,
  async (template, { rejectWithValue }) => {
    const { data, error } = await createTemplateRequest(template)

    if (error || !data) {
      return rejectWithValue(
        new AppError(
          TemplateError.CreateTemplate,
          error?.data || "Something went wrong"
        )
      )
    }

    return data
  }
)
