/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { TemplatesEvent } from "App/templates/constants"
import { UpdateTemplateError } from "App/templates/errors"
import { updateTemplateRequest } from "App/templates/requests/update-template.request"
import { Template } from "App/templates/dto"

export const updateTemplate = createAsyncThunk<Error | Template, Template>(
  TemplatesEvent.UpdateTemplate,
  async (template, { rejectWithValue }) => {
    const { data, error } = await updateTemplateRequest(template)

    if (error || !data) {
      return rejectWithValue(
        new UpdateTemplateError(error?.data || "Something went wrong")
      )
    }

    return data
  }
)
