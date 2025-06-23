/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type ContactSupportError = string | null
export enum SendTicketStatus {
  Sending = "sending",
  Success = "success",
  Error = "error",
  Idle = "idle",
}

export const files = [
  {
    name: "test.zip", // TODO: replace with real name
  },
]

export interface SendTicketState {
  status: SendTicketStatus
  error: ContactSupportError
}

export interface ContactSupportState {
  sendTicket: SendTicketState
}

// TODO: Move to create-freshdesk-ticket.types when createFreshdeskTicket will be ready

export enum FreshdeskTicketDataType {
  Problem = "Problem",
}

export enum FreshdeskTicketProduct {
  Pure = "Mudita Pure",
  Harmony = "Mudita Harmony",
  HarmonyMsc = "Mudta Harmony MSC Mode",
  Unknown = "Unknown",
  None = "None",
}

export interface FreshdeskTicketData {
  type: FreshdeskTicketDataType.Problem
  email?: string
  subject: string
  description?: string
  serialNumber?: string
  deviceID?: string
  attachments: File[]
  product: FreshdeskTicketProduct
}

export type SendTicketPayload = Pick<
  FreshdeskTicketData,
  "email" | "description"
>
