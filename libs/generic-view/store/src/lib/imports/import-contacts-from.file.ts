/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { UnifiedContact } from "device/models"
import { readAndGetFileRequest } from "device/feature"
import { openFileRequest } from "system-utils/feature"
import { detect } from "jschardet"
import { parseCsv } from "./contacts-mappers/csv/parse-csv"
import { mapCsv } from "./contacts-mappers/csv/map-csv"
import { parseVcard } from "./contacts-mappers/vcard/parse-vcard"
import { mapVcard } from "./contacts-mappers/vcard/map-vcard"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ImportProviderState } from "./reducer"
import { cleanImportProcess } from "./actions"
import { addMissingFields } from "./contacts-mappers/helpers"

const messages = defineMessages({
  dialogTitle: {
    id: "module.genericViews.importContacts.fileUploadDialog.title",
  },
  dialogFilters: {
    id: "module.genericViews.importContacts.fileUploadDialog.filters",
  },
  errorMessage: {
    id: "module.genericViews.importContacts.failure.fileErrorMessage",
  },
  cancellationTitle: {
    id: "module.genericViews.importContacts.cancellation.title",
  },
  cancellationMessage: {
    id: "module.genericViews.importContacts.cancellation.message",
  },
})

export const importContactsFromFile = createAsyncThunk<
  UnifiedContact[] | undefined,
  undefined,
  {
    state: ReduxRootState
    rejectValue: ImportProviderState["error"] | "cancelled"
  }
>(ActionName.StartContactsFileImport, async (_, { rejectWithValue }) => {
  const handleError = () => {
    return rejectWithValue(intl.formatMessage(messages.errorMessage))
  }
  try {
    const openFileResult = await openFileRequest({
      properties: ["openFile"],
      title: intl.formatMessage(messages.dialogTitle),
      filters: [
        {
          name: intl.formatMessage(messages.dialogFilters),
          extensions: ["csv", "vcf"],
        },
      ],
    })

    if (!openFileResult.ok) {
      cleanImportProcess()
      return rejectWithValue("cancelled")
    }

    const filePath = openFileResult.data[0]

    const fileResponse = await readAndGetFileRequest(filePath)
    if (!fileResponse.ok) {
      return handleError()
    }

    const fileBuffer = Buffer.from(fileResponse.data)

    const sample = fileBuffer.subarray(0, 1024 * 1024)
    let { encoding, confidence } = detect(sample) ?? {}

    if (!encoding || confidence < 0.9) {
      const fullDetect = detect(fileBuffer)
      encoding = fullDetect?.encoding ?? "utf8"
    }
    const content = fileBuffer.toString(encoding as BufferEncoding)

    if (!content) {
      return handleError()
    }

    switch (true) {
      case filePath.endsWith(".csv"):
        return mapCsv(parseCsv(content)).map(addMissingFields)
      case filePath.endsWith(".vcf"):
        return mapVcard(parseVcard(content)).map(addMissingFields)
      default:
        return handleError()
    }
  } catch (error) {
    console.error(error)
    return handleError()
  }
})
