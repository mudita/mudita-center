/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { UnifiedContact } from "device/models"
import { readAndGetFileRequest, selectSingleFileRequest } from "device/feature"
import { detect } from "jschardet"
import { parseCsv } from "./contacts-mappers/csv/parse-csv"
import { AppError } from "Core/core/errors"

export const importContactsFromFile = createAsyncThunk<
  UnifiedContact[],
  undefined,
  { state: ReduxRootState; rejectValue: string | AppError }
>(ActionName.StartContactsFileImport, async (_, { rejectWithValue }) => {
  const filePathResult = await selectSingleFileRequest({
    title: "Select contacts file",
    filters: [{ name: "Contact files", extensions: ["csv", "vcf"] }],
  })

  if (!filePathResult.ok) {
    return rejectWithValue(filePathResult.error)
  }

  const fileResponse = await readAndGetFileRequest(filePathResult.data)

  if (!fileResponse.ok) {
    return rejectWithValue(fileResponse.error)
  }

  const fileBuffer = Buffer.from(fileResponse.data)

  const { encoding } = detect(fileBuffer)
  const content = fileBuffer.toString(encoding as BufferEncoding)

  if (!content) {
    return rejectWithValue("The file could not be read.")
  }

  if (filePathResult.data.endsWith(".csv")) {
    try {
      return parseCsv(content)
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  } else if (filePathResult.data.endsWith(".vcf")) {
    return []
  } else {
    return rejectWithValue("Unsupported file type.")
  }
})
