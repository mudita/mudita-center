/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { UnifiedContact } from "device/models"
import logger from "Core/__deprecated__/main/utils/logger"
import {
  DomainData,
  transferDataToDevice,
} from "../data-transfer/transfer-data-to-device.action"
import { setDataTransferProcessStatus } from "./actions"
import { delay } from "shared/utils"

type ContactId = string

export const startContactsImportToDevice = createAsyncThunk<
  undefined,
  ContactId[],
  { state: ReduxRootState }
>(
  ActionName.StartContactsImportToDevice,
  async (contactsIds, { getState, dispatch, rejectWithValue, signal }) => {
    let aborted = false
    let abortTransfer = () => {}

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      aborted = true
      abortTransfer?.()
    }
    signal.addEventListener("abort", abortListener)

    const handleError = (message: string) => {
      logger.error(message)
      abortTransfer()
      return rejectWithValue(undefined)
    }

    if (aborted) {
      return handleError("Transfer aborted")
    }

    const activeProvider = getState().genericImport.currentImportProvider

    if (!activeProvider) {
      return handleError("No active provider")
    }

    const contacts: UnifiedContact[] =
      getState().genericImport.providers[activeProvider]?.contacts?.filter(
        (item) => contactsIds.includes(item.id)
      ) || []

    const domainsData: DomainData[] = [
      {
        domain: "contacts-v1",
        data: contacts,
      },
    ]

    dispatch(
      setDataTransferProcessStatus({
        status: "IMPORT-INTO-DEVICE-FILES-TRANSFER",
      })
    )

    const transferPromise = dispatch(transferDataToDevice(domainsData))
    abortTransfer = () => transferPromise.abort()
    const response = await transferPromise

    if (response.meta.requestStatus === "rejected") {
      return handleError("Error transferring data")
    }

    dispatch(
      setDataTransferProcessStatus({
        status: "IMPORT-DEVICE-DATA-TRANSFER",
      })
    )

    await delay(500)

    dispatch(
      setDataTransferProcessStatus({
        status: "DONE",
      })
    )

    return
  }
)
