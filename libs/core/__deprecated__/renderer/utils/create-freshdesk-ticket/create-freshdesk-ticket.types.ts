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
  Unknown = "Unknown",
  None = "None",
}

export interface FreshdeskTicketData {
  type: FreshdeskTicketDataType.Problem
  email?: string
  subject: string
  description?: string
  serialNumber?: string
  attachments: File[]
  product: FreshdeskTicketProduct
}
