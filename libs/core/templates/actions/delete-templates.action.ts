/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"
import { TemplateError, TemplatesEvent } from "Core/templates/constants"
import { deleteTemplatesRequest } from "Core/templates/requests"

export const deleteTemplates = createAsyncThunk<Error | string[], string[]>(
  TemplatesEvent.DeleteTemplates,
  async (ids, { rejectWithValue }) => {
    const { error } = await deleteTemplatesRequest(ids)
    if (error && error.data === undefined) {
      return rejectWithValue(
        new AppError(
          TemplateError.DeleteTemplate,
          "Delete Template request failed"
        )
      )
    }

    if (error && error.data !== undefined) {
      return error.data.successIds
    }

    return ids
  }
)
