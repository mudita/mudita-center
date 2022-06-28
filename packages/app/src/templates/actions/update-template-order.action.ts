/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { TemplatesEvent } from "App/templates/constants"
import { UpdateTemplateOrderError } from "App/templates/errors"
import { updateTemplateOrderRequest } from "App/templates/requests"
import { Template } from "App/templates/dto"

export const updateTemplateOrder = createAsyncThunk<Error | Template, Template>(
  TemplatesEvent.UpdateTemplateOrder,
  async (template, { rejectWithValue }) => {
    const { data, error } = await updateTemplateOrderRequest(template)

    if (error || !data) {
      return rejectWithValue(
        new UpdateTemplateOrderError(
          error?.message || "Something went wrong",
          error?.data
        )
      )
    }

    return data
  }
)
