/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { TemplateError, TemplatesEvent } from "Core/templates/constants"
import { updateTemplateOrderRequest } from "Core/templates/requests"
import { Template } from "Core/templates/dto"
import { AppError } from "Core/core/errors"

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
