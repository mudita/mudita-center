/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import {
  ApiFileTransferError,
  DataTransferDomain,
  UnifiedContact,
} from "device/models"
import {
  cancelDataTransferRequest,
  checkDataTransferRequest,
  sendClearRequest,
  startDataTransferRequest,
  startPreDataTransferRequest,
  startPreSendWithDataFileRequest,
} from "device/feature"
import { sendFile } from "../file-transfer/send-file.action"
import {
  clearDataTransfer,
  setDataTransfer,
  setDataTransferAbort,
  setDataTransferStatus,
} from "./actions"
import { isEmpty } from "lodash"
import { DataTransfer } from "./reducer"
import { selectActiveApiDeviceId } from "../selectors/select-active-api-device-id"

export type DomainData = {
  domain: Extract<DataTransferDomain, "contacts-v1">
  data: UnifiedContact[]
}

export const transferDataToDevice = createAsyncThunk<
  undefined,
  DomainData[],
  { state: ReduxRootState }
>(
  ActionName.TransferDataToDevice,
  async (
    domainsData,
    { getState, dispatch, abort, rejectWithValue, signal }
  ) => {
    let abortFileRequest: VoidFunction

    const transferAbortController = new AbortController()
    transferAbortController.abort = abort
    dispatch(setDataTransferAbort(transferAbortController))

    const handleError = (type?: ApiFileTransferError) => {
      console.log("handleError", type)
      dispatch(clearDataTransfer())
      void clearTransfers?.()
      return rejectWithValue(type)
    }

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      abortFileRequest?.()
      await clearTransfers?.()
      if (dataTransferId && deviceId) {
        await cancelDataTransferRequest(dataTransferId, deviceId)
      }
    }
    signal.addEventListener("abort", abortListener)

    const deviceId = selectActiveApiDeviceId(getState())

    if (!deviceId) {
      return handleError()
    }

    if (domainsData.some((domainData) => isEmpty(domainData.data))) {
      return handleError()
    }

    dispatch(
      setDataTransfer(
        domainsData.reduce((acc: DataTransfer, domainData) => {
          acc[domainData.domain] = {
            status: "IDLE",
          }
          return acc
        }, {})
      )
    )

    const preDataTransferResponse = await startPreDataTransferRequest(
      domainsData.map((domainData) => domainData.domain),
      deviceId
    )

    if (!preDataTransferResponse.ok) {
      return handleError(
        preDataTransferResponse.error?.type as ApiFileTransferError
      )
    }

    const { dataTransferId, domains: domainsPathMap } =
      preDataTransferResponse.data

    dispatch(
      setDataTransfer(
        domainsData.reduce((acc: DataTransfer, domainData) => {
          acc[domainData.domain] = {
            status: "READY",
          }
          return acc
        }, {})
      )
    )

    if (signal.aborted) {
      return handleError()
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

    for (const [index, domain] of domainsPaths.entries()) {
      if (signal.aborted) {
        return handleError()
      }

      const preSendData = JSON.stringify({
        data: domainsData.find(
          (domainData) => domainData.domain === domain.domainKey
        )?.data,
      })

      const preSendResponse = await startPreSendWithDataFileRequest(
        `${dataTransferId}-${domain.domainKey}`,
        domain.path,
        preSendData,
        deviceId
      )

      if (!preSendResponse.ok) {
        return handleError(preSendResponse.error?.type as ApiFileTransferError)
      }

      domainsPaths[index].transfer = preSendResponse.data
      dispatch(
        setDataTransfer({
          [domain.domainKey]: {
            status: "IN-PROGRESS",
          },
        })
      )
    }

    for (const domain of domainsPaths) {
      if (signal.aborted) {
        return handleError()
      }

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
      if (
        sendFileResponse.meta.requestStatus === "rejected" ||
        signal.aborted
      ) {
        return handleError()
      }

      if (sendFileResponse.meta.requestStatus === "fulfilled") {
        dispatch(
          setDataTransfer({
            [domain.domainKey]: {
              status: "PROCESSING",
            },
          })
        )
      }
    }

    await clearTransfers()

    if (signal.aborted) {
      return handleError()
    }
    dispatch(setDataTransferStatus("FINALIZING"))
    const startDataTransferResponse = await startDataTransferRequest(
      dataTransferId,
      deviceId
    )

    if (!startDataTransferResponse.ok) {
      return handleError()
    }

    let progress = startDataTransferResponse.data.progress
    while (progress < 100) {
      if (signal.aborted) {
        return handleError()
      }
      const checkPreRestoreResponse = await checkDataTransferRequest(
        dataTransferId,
        deviceId
      )
      if (!checkPreRestoreResponse.ok) {
        return handleError()
      }
      progress = checkPreRestoreResponse.data.progress
    }

    setDataTransfer(
      domainsData.reduce((acc: DataTransfer, domainData) => {
        acc[domainData.domain] = {
          status: "FINISHED",
        }
        return acc
      }, {})
    )

    if (signal.aborted) {
      return handleError()
    }

    dispatch(clearDataTransfer())
    return undefined
  }
)
