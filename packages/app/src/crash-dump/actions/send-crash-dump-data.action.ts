/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  attachedFileName,
  downloadingLogs,
} from "App/contact-support/helpers/downloading-logs"
import { AppError } from "App/core/errors"
import { resetCrashDump } from "App/crash-dump/actions/base.action"
import { CrashDumpError, Event } from "App/crash-dump/constants"
import { removeFile } from "App/device-file-system"
import { DeviceError } from "App/device/constants"
import archiveFiles from "App/__deprecated__/renderer/requests/archive-files.request"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import createFile from "App/__deprecated__/renderer/utils/create-file/create-file"
import createFreshdeskTicket from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
import {
  FreshdeskTicketData,
  FreshdeskTicketDataType,
} from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket.types"

const mapToAttachments = (paths: string[]): File[] => {
  return paths.map((path) => createFile(path))
}

export const sendCrashDumpData = createAsyncThunk(
  Event.SendCrashDump,
  async (_, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as ReduxRootState

    if (!state.crashDump.data.downloadedFiles.length) {
      return
    }

    if (!state.device.data?.serialNumber) {
      return rejectWithValue(
        new AppError(DeviceError.Connection, "Device isn't connected")
      )
    }

    const files = await downloadingLogs()

    const buffer = await archiveFiles({ files })

    if (buffer === undefined) {
      return rejectWithValue(
        new AppError(
          CrashDumpError.Sending,
          "Create Crash Dump Ticket - ArchiveFiles error"
        )
      )
    }

    const logsAttachments = [
      new File([buffer], attachedFileName, { type: "application/zip" }),
    ]

    const crashDumpAttachments = mapToAttachments(
      state.crashDump.data.downloadedFiles
    )
    const attachments = [...logsAttachments, ...crashDumpAttachments]

    const data: FreshdeskTicketData = {
      type: FreshdeskTicketDataType.Problem,
      subject: "Error - Crash dump",
      serialNumber: state.device.data.serialNumber,
      attachments,
    }

    try {
      await createFreshdeskTicket(data)
    } catch (error) {
      return rejectWithValue(
        new AppError(
          CrashDumpError.Sending,
          "The error happened during crash dump sending process",
          error
        )
      )
    }

    await Promise.all([
      ...state.crashDump.data.files.map((path) => {
        dispatch(removeFile(path))
      }),
    ])

    dispatch(resetCrashDump())

    return
  }
)
