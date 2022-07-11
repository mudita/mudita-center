/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { TemplateError, TemplatesEvent } from "App/templates/constants"
import { updateTemplateOrderRequest } from "App/templates/requests"
import { Template } from "App/templates/dto"
import { AppError } from "App/core/errors"

export const updateTemplateOrder = createAsyncThunk<
  Error | Template[],
  Template[]
>(
  TemplatesEvent.UpdateTemplateOrder,
  async (templates, { rejectWithValue }) => {
    const { error } = await updateTemplateOrderRequest(templates)

    if (error) {
      return rejectWithValue(
        new AppError(
          TemplateError.UpdateTemplateOrder,
          error?.message || "Something went wrong",
          error?.data
        )
      )
    }

    return templates
  }
)
