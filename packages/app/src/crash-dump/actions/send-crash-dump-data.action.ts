/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { Event } from "App/crash-dump/constants"
import { ReduxRootState } from "App/renderer/store"
import { SendingCrashDumpError } from "App/crash-dump/errors"
import { DeviceConnectionError } from "App/device"
import { removeFile } from "App/device-file-system"
import { resetCrashDump } from "App/crash-dump/actions/base.action"
import createFreshdeskTicket from "Renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
import {
  FreshdeskTicketData,
  FreshdeskTicketDataType,
} from "Renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket.types"
import createFile from "Renderer/utils/create-file/create-file"
import archiveFiles from "Renderer/requests/archive-files.request"
import {
  downloadingLogs,
  attachedFileName,
} from "App/contact-support/helpers/downloading-logs"

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
        new DeviceConnectionError("Device isn't connected")
      )
    }

    const files = await downloadingLogs()

    const buffer = await archiveFiles({ files })

    if (buffer === undefined) {
      return rejectWithValue(
        new SendingCrashDumpError(
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
    const attachments = logsAttachments.concat(crashDumpAttachments)

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
        new SendingCrashDumpError(
          "The error happened during crash dump sending process",
          error
        )
      )
    }

    for await (const path of state.crashDump.data.files) {
      await dispatch(removeFile(path))
    }

    await dispatch(resetCrashDump())

    return
  }
)
