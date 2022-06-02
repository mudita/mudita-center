/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { deleteTemplatesRequest } from "App/templates/requests"
import { TemplatesEvent } from "App/templates/constants"
import { DeleteTemplateError } from "App/templates/errors"

export const deleteTemplates = createAsyncThunk<Error | string[], string[]>(
  TemplatesEvent.DeleteTemplates,
  async (ids, { rejectWithValue }) => {
    const { error } = await deleteTemplatesRequest(ids)
    if (error && error.data === undefined) {
      return rejectWithValue(
        new DeleteTemplateError("Delete Template request failed")
      )
    }

    if (error && error.data !== undefined) {
      const successIds = ids.filter((id) => error.data.includes(id))
      return successIds
    }

    return ids
  }
)
