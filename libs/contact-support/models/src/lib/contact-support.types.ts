/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

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

export interface CustomerSupportCreateTicketPayload {
  type: FreshdeskTicketDataType.Problem
  email?: string
  subject: string
  description?: string
  serialNumber?: string
  deviceId?: string
  product: FreshdeskTicketProduct
}

export type SendTicketPayload = Pick<
  CustomerSupportCreateTicketPayload,
  "email" | "description"
>
