/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import logger from "App/main/utils/logger"
import { ContactSupportEvent } from "App/contact-support/constants"
import sendTicketRequest, {
  CreateBugTicketResponseStatus,
} from "App/contact-support/requests/send-ticket.request"
import { ReduxRootState, RootState } from "Renderer/store"
import { StartBackupDeviceError } from "App/backup-device"
import { FreshdeskTicketData } from "Renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket.types"

export type SendTicketPayload = Pick<
  FreshdeskTicketData,
  "email" | "description"
>

export const sendTicket = createAsyncThunk<undefined, SendTicketPayload>(
  ContactSupportEvent.SendTicket,
  async ({ email, description }, { getState, rejectWithValue }) => {
    const state = getState() as RootState & ReduxRootState
    const serialNumber = state.device.data?.serialNumber

    const response = await sendTicketRequest({
      email,
      description,
      serialNumber,
      subject: `Error`,
    })

    if (response.status === CreateBugTicketResponseStatus.Ok) {
      return
    } else {
      logger.error(`Send Ticket: ${response.error?.message}`)
      return rejectWithValue(
        new StartBackupDeviceError("Send ticket throw error")
      )
    }
  }
)
