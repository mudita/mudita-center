/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { TemplatesEvent } from "App/templates/constants"
import { CreateTemplateError } from "App/templates/errors"
import { createTemplateRequest } from "App/templates/requests/create-template.request"
import { NewTemplate, Template } from "App/templates/dto"

export const createTemplate = createAsyncThunk<Error | Template, NewTemplate>(
  TemplatesEvent.CreateTemplate,
  async (template, { rejectWithValue }) => {
    const { data, error } = await createTemplateRequest(template)

    if (error || !data) {
      return rejectWithValue(
        new CreateTemplateError(error?.data || "Something went wrong")
      )
    }

    return data
  }
)
