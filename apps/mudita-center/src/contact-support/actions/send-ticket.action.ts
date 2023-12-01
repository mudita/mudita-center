/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  ContactSupportEvent,
  ContactSupportError,
} from "App/contact-support/constants"
import sendTicketRequest, {
  CreateBugTicketResponseStatus,
} from "App/contact-support/requests/send-ticket.request"
import { AppError } from "App/core/errors"
import logger from "App/__deprecated__/main/utils/logger"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import { FreshdeskTicketData } from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket.types"
import { mapDeviceTypeToProduct } from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/map-device-type-to-product.helper"

export type SendTicketPayload = Pick<
  FreshdeskTicketData,
  "email" | "description"
>

export const sendTicket = createAsyncThunk<undefined, SendTicketPayload>(
  ContactSupportEvent.SendTicket,
  async ({ email, description }, { getState, rejectWithValue }) => {
    const state = getState() as RootState & ReduxRootState
    const serialNumber = state.device.data?.serialNumber
    const product = mapDeviceTypeToProduct(state.device.deviceType)

    const response = await sendTicketRequest({
      email,
      description: (description || "").replace(/\r\n|\r|\n/g, "<br/>"),
      serialNumber,
      subject: `Error`,
      product,
    })

    if (response.status === CreateBugTicketResponseStatus.Ok) {
      return
    } else {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      logger.error(`Send Ticket: ${response.error?.message}`)
      return rejectWithValue(
        new AppError(ContactSupportError.SendTicket, "Send ticket throw error")
      )
    }
  }
)
