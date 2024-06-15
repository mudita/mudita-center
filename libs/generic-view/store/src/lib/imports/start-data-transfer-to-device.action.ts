/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DataTransferDomain, UnifiedContact } from "device/models"
import {
  cancelDataTransferRequest,
  checkDataTransferRequest,
  sendClearRequest,
  startDataTransferRequest,
  startPreDataTransferRequest,
  startPreSendWithDataFileRequest,
} from "device/feature"
import { ActionName } from "../action-names"
import { sendFile } from "../file-transfer/send-file.action"
import { selectActiveApiDeviceId } from "../selectors"
import {
  setDataTransferProcessFileStatus,
  setDataTransferProcessStatus,
} from "./actions"

export const startDataTransferToDevice = createAsyncThunk<
  undefined,
  { domains: DataTransferDomain[]; contactsIds: string[] },
  { state: ReduxRootState }
>(
  ActionName.StartDataTransferToDevice,
  async (
    { domains, contactsIds },
    { getState, dispatch, rejectWithValue, signal }
  ) => {
    let aborted = false
    let abortFileRequest: VoidFunction

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      aborted = true
      abortFileRequest?.()
      await clearTransfers?.()
      if (dataTransferId && deviceId) {
        await cancelDataTransferRequest(dataTransferId, deviceId)
      }
    }
    signal.addEventListener("abort", abortListener)

    const deviceId = selectActiveApiDeviceId(getState())
    const activeProvider = getState().genericImport.currentImportProvider

    if (!deviceId || !activeProvider) {
      return rejectWithValue(undefined)
    }

    const dataToImport: Partial<Record<DataTransferDomain, UnifiedContact[]>> =
      {
        ...(domains.find((item) => item === "contacts-v1") && {
          "contacts-v1": getState().genericImport.providers[
            activeProvider
          ]?.contacts?.filter((item) => contactsIds.includes(item.id)),
        }),
      }

    const availableDomainsCount = Object.values(dataToImport).filter((item) => {
      return item && item.length > 0
    }).length

    if (availableDomainsCount < domains.length) {
      //one or more domains are empty
      console.log("missing data to transfer")
      return rejectWithValue(undefined)
    }

    const preDataTransferResponse = await startPreDataTransferRequest(
      domains,
      deviceId
    )

    if (!preDataTransferResponse.ok) {
      console.log("preDataTransfer failed")
      return rejectWithValue(undefined)
    }

    const { dataTransferId, domains: domainsPathMap } =
      preDataTransferResponse.data

    if (aborted) {
      return rejectWithValue(undefined)
    }

    const domainsPaths: {
      domainKey: DataTransferDomain
      path: string
      transfer?: {
        transferId: number
        chunksCount: number
      }
    }[] = Object.entries(domainsPathMap).map(([domain, path]) => {
      return {
        domainKey: domain as DataTransferDomain,
        path,
      }
    })

    const clearTransfers = () => {
      return Promise.all(
        domainsPaths.map(async (domain) => {
          domain.transfer?.transferId &&
            (await sendClearRequest(domain.transfer.transferId))
        })
      )
    }

    for (let i = 0; i < domainsPaths.length; ++i) {
      if (aborted) {
        return rejectWithValue(undefined)
      }

      const domain = domainsPaths[i]

      const data = JSON.stringify({
        data: dataToImport[domain.domainKey],
      })

      const preSendResponse = await startPreSendWithDataFileRequest(
        `${dataTransferId}-${domain.domainKey}`,
        domain.path,
        data,
        deviceId
      )

      if (!preSendResponse.ok) {
        console.log("cannot start pre send")
        clearTransfers()
        return rejectWithValue(undefined)
      }

      domainsPaths[i].transfer = preSendResponse.data
      dispatch(
        setDataTransferProcessFileStatus({
          domain: domain.domainKey,
          status: "PENDING",
        })
      )
    }

    dispatch(
      setDataTransferProcessStatus({
        status: "IMPORT-INTO-DEVICE-FILES-TRANSFER",
      })
    )

    for (let i = 0; i < domainsPaths.length; ++i) {
      if (aborted) {
        return rejectWithValue(undefined)
      }
      const domain = domainsPaths[i]
      dispatch(
        setDataTransferProcessFileStatus({
          domain: domain.domainKey,
          status: "IN_PROGRESS",
        })
      )
      const sendFilePromise = dispatch(
        sendFile({
          deviceId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          transferId: domain.transfer?.transferId!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          chunksCount: domain.transfer?.chunksCount!,
        })
      )
      abortFileRequest = sendFilePromise.abort
      const sendFileResponse = await sendFilePromise
      if (sendFileResponse.meta.requestStatus !== "fulfilled") {
        clearTransfers()
        return rejectWithValue(undefined)
      }
      if (!aborted) {
        dispatch(
          setDataTransferProcessFileStatus({
            domain: domain.domainKey,
            status: "DONE",
          })
        )
      }
    }

    clearTransfers()

    dispatch(
      setDataTransferProcessStatus({ status: "IMPORT-DEVICE-DATA-TRANSFER" })
    )

    if (aborted) {
      return rejectWithValue(undefined)
    }

    const startDataTransferResponse = await startDataTransferRequest(
      dataTransferId,
      deviceId
    )

    if (!startDataTransferResponse.ok) {
      console.log("start data transfer failed")
      return rejectWithValue(undefined)
    }

    let progress = startDataTransferResponse.data.progress

    while (progress < 100) {
      if (aborted) {
        return rejectWithValue(undefined)
      }
      const checkPreRestoreResponse = await checkDataTransferRequest(
        dataTransferId,
        deviceId
      )

      if (!checkPreRestoreResponse.ok) {
        console.log(checkPreRestoreResponse.error)
        return rejectWithValue(undefined)
      }

      progress = checkPreRestoreResponse.data.progress
    }

    if (aborted) {
      return rejectWithValue(undefined)
    }

    return undefined
  }
)
